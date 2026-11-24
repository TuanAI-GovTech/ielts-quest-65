// IELTS Quest 6.5 - Application Engine (v4.0)
class IELTSQuestApp {
  constructor() {
    this.state = this.loadState();
    this.vocabIndex = 0;
    this.currentQuest = null;
    this.speechRecognition = null;
    this.isRecording = false;
    this.speechTimer = null;
    this.speechSeconds = 0;
    
    this.initAudioContext();
    this.initElements();
    this.initEventListeners();
    this.renderAll();
  }

  loadState() {
    const saved = localStorage.getItem("ielts_quest_state_v4");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse state", e);
      }
    }
    return {
      xp: 320,
      streak: 5,
      completedQuests: ["q-vocab-env"],
      currentStage: 1,
      estimatedBand: 6.0,
      scores: {
        listening: 6.5,
        reading: 6.5,
        writing: 6.0,
        speaking: 6.0
      }
    };
  }

  saveState() {
    localStorage.setItem("ielts_quest_state_v4", JSON.stringify(this.state));
    this.updateHeaderStats();
  }

  initAudioContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  playTone(freq, type = "sine", duration = 0.15) {
    if (!this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio error ignored
    }
  }

  playSuccessSound() {
    this.playTone(523.25, "sine", 0.1); // C5
    setTimeout(() => this.playTone(659.25, "sine", 0.1), 100); // E5
    setTimeout(() => this.playTone(783.99, "sine", 0.2), 200); // G5
  }

  playErrorSound() {
    this.playTone(220, "sawtooth", 0.15);
    setTimeout(() => this.playTone(180, "sawtooth", 0.2), 150);
  }

  speakText(text, lang = "en-GB") {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95;
      
      const voices = window.speechSynthesis.getVoices();
      const gbVoice = voices.find(v => v.lang.includes("en-GB") || v.lang.includes("en-US"));
      if (gbVoice) utterance.voice = gbVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  }

  initElements() {
    this.tabs = document.querySelectorAll(".nav-tab");
    this.tabPanes = document.querySelectorAll(".tab-pane");
    this.userXpEl = document.getElementById("user-xp");
    this.userStreakEl = document.getElementById("user-streak");
    this.userBandEl = document.getElementById("user-band");
    this.bannerProgressEl = document.getElementById("banner-progress-val");
    this.toastContainer = document.getElementById("toast-container");
  }

  initEventListeners() {
    // Navigation tabs
    this.tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        this.switchTab(target);
      });
    });

    // Vocab navigation
    document.getElementById("btn-prev-vocab")?.addEventListener("click", () => {
      this.vocabIndex = (this.vocabIndex - 1 + IELTS_DATA.vocabulary.length) % IELTS_DATA.vocabulary.length;
      this.renderVocabCard();
    });

    document.getElementById("btn-next-vocab")?.addEventListener("click", () => {
      this.vocabIndex = (this.vocabIndex + 1) % IELTS_DATA.vocabulary.length;
      this.renderVocabCard();
    });

    document.getElementById("btn-speak-word")?.addEventListener("click", () => {
      const cur = IELTS_DATA.vocabulary[this.vocabIndex];
      this.speakText(cur.word);
    });

    // Listening Player
    const playListeningBtn = document.getElementById("btn-play-listening");
    playListeningBtn?.addEventListener("click", () => {
      const script = IELTS_DATA.listeningSets[0].audioScript;
      this.speakText(script, "en-GB");
      this.showToast("Đang phát bài nghe IELTS Section 1...");
    });

    // Writing Analyzer
    document.getElementById("btn-analyze-essay")?.addEventListener("click", () => {
      this.analyzeWritingEssay();
    });

    // Speaking Recorder
    document.getElementById("mic-btn")?.addEventListener("click", () => {
      this.toggleSpeakingRecording();
    });

    // Band Predictor recalculation
    document.querySelectorAll(".band-slider")?.forEach(slider => {
      slider.addEventListener("input", () => {
        this.updateBandPredictionFromSliders();
      });
    });
  }

  switchTab(tabId) {
    this.tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
    this.tabPanes.forEach(p => p.classList.toggle("active", p.id === `tab-${tabId}`));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  showToast(message, type = "info") {
    if (!this.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    let icon = "💡";
    if (type === "success") icon = "🎉";
    if (type === "error") icon = "⚠️";
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  addXp(amount, reason = "Hoàn thành nhiệm vụ") {
    this.state.xp += amount;
    this.playSuccessSound();
    this.showToast(`+${amount} XP: ${reason}!`, "success");
    this.saveState();
    this.renderRoadmap();
  }

  updateHeaderStats() {
    if (this.userXpEl) this.userXpEl.textContent = `${this.state.xp} XP`;
    if (this.userStreakEl) this.userStreakEl.textContent = `${this.state.streak} Ngày`;
    if (this.userBandEl) this.userBandEl.textContent = this.state.estimatedBand.toFixed(1);
    if (this.bannerProgressEl) {
      const overall = ((this.state.scores.listening + this.state.scores.reading + this.state.scores.writing + this.state.scores.speaking) / 4);
      this.bannerProgressEl.textContent = overall.toFixed(1);
    }
  }

  renderAll() {
    this.updateHeaderStats();
    this.renderRoadmap();
    this.renderVocabCard();
    this.renderListeningQuiz();
    this.renderReadingQuiz();
    this.renderGrammarChallenges();
    this.renderSpeakingCueCard();
  }

  /* 1. Roadmap */
  renderRoadmap() {
    const container = document.getElementById("roadmap-container");
    if (!container) return;
    container.innerHTML = "";

    IELTS_DATA.roadmap.forEach((stage, idx) => {
      const stageCard = document.createElement("div");
      stageCard.className = "stage-card";
      
      const questsHtml = stage.quests.map(q => {
        const isDone = this.state.completedQuests.includes(q.id);
        return `
          <div class="quest-item ${isDone ? 'completed' : ''}" onclick="app.startQuest('${q.id}', '${q.type}')">
            <div class="quest-title">
              <span>${q.title}</span>
              ${isDone ? '<span style="color:var(--accent-emerald)">✓ Đạt</span>' : '<span>➔</span>'}
            </div>
            <div class="quest-meta">
              <span>Loại: ${q.type.toUpperCase()}</span>
              <span class="badge-xp">+${q.xp} XP</span>
            </div>
          </div>
        `;
      }).join("");

      stageCard.innerHTML = `
        <div class="stage-header">
          <div class="stage-info">
            <div class="stage-icon">${stage.icon}</div>
            <div>
              <div class="stage-title">${stage.title}</div>
              <div class="stage-desc">${stage.description}</div>
            </div>
          </div>
          <div class="badge-xp">Mở khóa: ${stage.requiredXp} XP</div>
        </div>
        <div class="quest-grid">
          ${questsHtml}
        </div>
      `;
      container.appendChild(stageCard);
    });
  }

  startQuest(questId, type) {
    if (type === "vocab") this.switchTab("vocab");
    else if (type === "listening") this.switchTab("listening");
    else if (type === "reading") this.switchTab("reading");
    else if (type === "writing") this.switchTab("writing");
    else if (type === "speaking") this.switchTab("speaking");
    else if (type === "grammar") this.switchTab("grammar");
    else this.switchTab("mock");

    if (!this.state.completedQuests.includes(questId)) {
      this.state.completedQuests.push(questId);
      this.addXp(150, "Bắt đầu nhiệm vụ");
    }
  }

  /* 2. Vocabulary Arena */
  renderVocabCard() {
    const cur = IELTS_DATA.vocabulary[this.vocabIndex];
    if (!cur) return;

    document.getElementById("vocab-word").textContent = cur.word;
    document.getElementById("vocab-ipa").textContent = `${cur.ipa} • [${cur.type}]`;
    document.getElementById("vocab-meaning").textContent = cur.meaningVi;
    document.getElementById("vocab-example").textContent = `"${cur.example}"`;
    document.getElementById("vocab-note").textContent = cur.band65Note;
    document.getElementById("vocab-counter").textContent = `${this.vocabIndex + 1} / ${IELTS_DATA.vocabulary.length}`;

    const collocList = document.getElementById("vocab-colloc-list");
    if (collocList) {
      collocList.innerHTML = cur.collocations.map(c => `<li>🔹 <strong>${c}</strong></li>`).join("");
    }

    // Render Mini Quiz
    const quizQuestionEl = document.getElementById("vocab-quiz-question");
    const quizOptionsEl = document.getElementById("vocab-quiz-options");
    const quizFeedbackEl = document.getElementById("vocab-quiz-feedback");

    if (quizQuestionEl && quizOptionsEl) {
      quizQuestionEl.textContent = cur.quiz.question;
      quizFeedbackEl.style.display = "none";
      quizOptionsEl.innerHTML = "";

      cur.quiz.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;
        btn.onclick = () => {
          if (idx === cur.quiz.answer) {
            btn.classList.add("correct");
            quizFeedbackEl.style.display = "block";
            quizFeedbackEl.style.background = "rgba(16, 185, 129, 0.2)";
            quizFeedbackEl.style.color = "var(--accent-emerald)";
            quizFeedbackEl.innerHTML = `<strong>Chính xác!</strong> Bạn đã làm chủ cụm collocation chuẩn Band 6.5!`;
            this.playSuccessSound();
            this.addXp(25, "Trả lời đúng từ vựng");
          } else {
            btn.classList.add("wrong");
            quizFeedbackEl.style.display = "block";
            quizFeedbackEl.style.background = "rgba(244, 63, 94, 0.2)";
            quizFeedbackEl.style.color = "var(--accent-rose)";
            quizFeedbackEl.innerHTML = `<strong>Chưa đúng!</strong> Hãy xem lại ví dụ và thử lại nhé.`;
            this.playErrorSound();
          }
        };
        quizOptionsEl.appendChild(btn);
      });
    }
  }

  /* 3. Listening Lab */
  renderListeningQuiz() {
    const container = document.getElementById("listening-quiz-container");
    if (!container) return;
    const set = IELTS_DATA.listeningSets[0];
    container.innerHTML = "";

    set.questions.forEach((qItem, qIdx) => {
      const qDiv = document.createElement("div");
      qDiv.className = "quiz-box";
      qDiv.style.marginBottom = "16px";
      
      const opts = qItem.options.map((opt, oIdx) => `
        <button class="option-btn" onclick="app.checkListeningAnswer(${qIdx}, ${oIdx}, this)">
          ${String.fromCharCode(65 + oIdx)}. ${opt}
        </button>
      `).join("");

      qDiv.innerHTML = `
        <div class="quiz-question">${qItem.q}</div>
        <div class="options-list">${opts}</div>
        <div id="listen-feedback-${qIdx}" class="feedback-banner"></div>
      `;
      container.appendChild(qDiv);
    });
  }

  checkListeningAnswer(qIdx, oIdx, btn) {
    const qItem = IELTS_DATA.listeningSets[0].questions[qIdx];
    const fb = document.getElementById(`listen-feedback-${qIdx}`);
    if (oIdx === qItem.answer) {
      btn.classList.add("correct");
      fb.style.display = "block";
      fb.style.background = "rgba(16, 185, 129, 0.2)";
      fb.style.color = "var(--accent-emerald)";
      fb.innerHTML = `✓ Chính xác! Keyword trong bài: <em>"${qItem.keyword}"</em>`;
      this.playSuccessSound();
      this.addXp(50, "Đúng câu hỏi Listening");
    } else {
      btn.classList.add("wrong");
      fb.style.display = "block";
      fb.style.background = "rgba(244, 63, 94, 0.2)";
      fb.style.color = "var(--accent-rose)";
      fb.innerHTML = `✗ Chưa chính xác. Nghe lại đoạn chứa keyword: "${qItem.keyword}"`;
      this.playErrorSound();
    }
  }

  /* 4. Reading Arena */
  renderReadingQuiz() {
    const container = document.getElementById("reading-quiz-container");
    if (!container) return;
    const passage = IELTS_DATA.readingSets[0];
    document.getElementById("reading-passage-text").textContent = passage.passage;

    container.innerHTML = "";
    passage.questions.forEach((qItem, qIdx) => {
      const qDiv = document.createElement("div");
      qDiv.className = "quiz-box";
      qDiv.style.marginBottom = "16px";

      const opts = qItem.options.map((opt, oIdx) => `
        <button class="option-btn" onclick="app.checkReadingAnswer(${qIdx}, ${oIdx}, this)">
          ${opt}
        </button>
      `).join("");

      qDiv.innerHTML = `
        <div class="quiz-question"><strong>[${qItem.type}]</strong> ${qItem.q}</div>
        <div class="options-list">${opts}</div>
        <div id="reading-feedback-${qIdx}" class="feedback-banner"></div>
      `;
      container.appendChild(qDiv);
    });
  }

  checkReadingAnswer(qIdx, oIdx, btn) {
    const qItem = IELTS_DATA.readingSets[0].questions[qIdx];
    const fb = document.getElementById(`reading-feedback-${qIdx}`);
    if (oIdx === qItem.answer) {
      btn.classList.add("correct");
      fb.style.display = "block";
      fb.style.background = "rgba(16, 185, 129, 0.2)";
      fb.style.color = "var(--accent-emerald)";
      fb.innerHTML = `✓ Chính xác! Giải thích: ${qItem.explanation}`;
      this.playSuccessSound();
      this.addXp(50, "Đúng câu hỏi Reading");
    } else {
      btn.classList.add("wrong");
      fb.style.display = "block";
      fb.style.background = "rgba(244, 63, 94, 0.2)";
      fb.style.color = "var(--accent-rose)";
      fb.innerHTML = `✗ Đáp án chưa đúng. Giải thích: ${qItem.explanation}`;
      this.playErrorSound();
    }
  }

  /* 5. Grammar Challenges */
  renderGrammarChallenges() {
    const container = document.getElementById("grammar-container");
    if (!container) return;
    container.innerHTML = "";

    IELTS_DATA.grammarChallenges.forEach((item, idx) => {
      const box = document.createElement("div");
      box.className = "stage-card";
      box.style.marginBottom = "20px";

      const opts = item.options.map((opt, oIdx) => `
        <button class="option-btn" onclick="app.checkGrammarAnswer(${idx}, ${oIdx}, this)">
          ${String.fromCharCode(65 + oIdx)}. ${opt}
        </button>
      `).join("");

      box.innerHTML = `
        <div style="font-size:18px; font-weight:700; color:var(--accent-cyan); margin-bottom:8px;">
          ${item.title}
        </div>
        <p style="font-size:14px; color:var(--text-muted); margin-bottom:12px;">${item.description}</p>
        <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:6px; font-family:monospace; color:var(--accent-amber); margin-bottom:16px;">
          💡 Công thức: ${item.formula}
        </div>
        <div class="quiz-question">${item.question}</div>
        ${item.original ? `<div style="font-style:italic; margin-bottom:12px; color:var(--text-muted);">Gốc: "${item.original}"</div>` : ''}
        <div class="options-list">${opts}</div>
        <div id="grammar-feedback-${idx}" class="feedback-banner"></div>
      `;
      container.appendChild(box);
    });
  }

  checkGrammarAnswer(idx, oIdx, btn) {
    const item = IELTS_DATA.grammarChallenges[idx];
    const fb = document.getElementById(`grammar-feedback-${idx}`);
    if (oIdx === item.answer) {
      btn.classList.add("correct");
      fb.style.display = "block";
      fb.style.background = "rgba(16, 185, 129, 0.2)";
      fb.style.color = "var(--accent-emerald)";
      fb.innerHTML = `✓ Xuất sắc! ${item.explanation}`;
      this.playSuccessSound();
      this.addXp(60, "Hoàn thành thử thách Ngữ pháp");
    } else {
      btn.classList.add("wrong");
      fb.style.display = "block";
      fb.style.background = "rgba(244, 63, 94, 0.2)";
      fb.style.color = "var(--accent-rose)";
      fb.innerHTML = `✗ Chưa chính xác. ${item.explanation}`;
      this.playErrorSound();
    }
  }

  /* 6. Writing Studio */
  analyzeWritingEssay() {
    const textarea = document.getElementById("writing-essay-input");
    const text = textarea?.value.trim() || "";
    const words = text ? text.split(/\s+/).length : 0;
    const paragraphs = text ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;

    const resultBox = document.getElementById("writing-analysis-result");
    if (words < 50) {
      this.showToast("Bài viết quá ngắn để phân tích! Vui lòng viết ít nhất 150 từ.", "error");
      return;
    }

    // Heuristic scoring based on IELTS 6.5 criteria
    let trScore = 6.0;
    let ccScore = 6.0;
    let lrScore = 6.0;
    let graScore = 6.0;

    if (words >= 250 && words <= 330) trScore = 6.5;
    else if (words < 200) trScore = 5.5;

    if (paragraphs >= 4 && paragraphs <= 5) ccScore = 6.5;

    const academicWords = ["furthermore", "consequently", "nevertheless", "sustainable", "substantial", "deteriorate", "ubiquitous", "subsidize", "mobility", "catalyst", "exorbitant", "paradigm", "precarious"];
    let awlCount = 0;
    academicWords.forEach(w => {
      if (text.toLowerCase().includes(w)) awlCount++;
    });

    if (awlCount >= 5) lrScore = 6.5;
    if (awlCount >= 8) lrScore = 7.0;

    // Check complex sentence connectors
    const complexIndicators = ["although", "while", "whereas", "despite", "which", "that", "if", "were to", "had "];
    let complexCount = 0;
    complexIndicators.forEach(c => {
      if (text.toLowerCase().includes(c)) complexCount++;
    });

    if (complexCount >= 6) graScore = 6.5;

    const overall = ((trScore + ccScore + lrScore + graScore) / 4).toFixed(1);

    document.getElementById("score-tr").textContent = trScore.toFixed(1);
    document.getElementById("score-cc").textContent = ccScore.toFixed(1);
    document.getElementById("score-lr").textContent = lrScore.toFixed(1);
    document.getElementById("score-gra").textContent = graScore.toFixed(1);
    document.getElementById("overall-writing-band").textContent = overall;
    document.getElementById("writing-feedback-comment").innerHTML = `
      <strong>Nhận xét từ Giám khảo AI:</strong><br>
      • Độ dài: <strong>${words} từ</strong> (${paragraphs} đoạn văn).<br>
      • Vốn từ học thuật (AWL): Phát hiện <strong>${awlCount}</strong> từ vựng nâng cao đạt chuẩn Band 6.5+.<br>
      • Cấu trúc ngữ pháp đa dạng: Phát hiện <strong>${complexCount}</strong> mệnh đề phức/liên từ logic.<br>
      <em>Khuyến nghị:</em> Hãy duy trì cấu trúc 4 đoạn (Mở bài - 2 Thân bài - Kết bài) và sử dụng thêm các cấu trúc đảo ngữ hoặc mệnh đề quan hệ rút gọn để bứt phá lên Band 7.0!
    `;

    resultBox.style.display = "block";
    this.addXp(150, "Nộp và phân tích bài luận Writing");
  }

  /* 7. Speaking Simulator */
  renderSpeakingCueCard() {
    const cue = IELTS_DATA.speakingSets[0];
    document.getElementById("cue-topic").textContent = cue.topic;
    const bulletsUl = document.getElementById("cue-bullets");
    if (bulletsUl) {
      bulletsUl.innerHTML = cue.pointsToCover.map(p => `<li>${p}</li>`).join("");
    }
    const vocabUl = document.getElementById("cue-vocab-list");
    if (vocabUl) {
      vocabUl.innerHTML = cue.band65Vocabulary.map(v => `<li>⚡ <strong>${v}</strong></li>`).join("");
    }
  }

  toggleSpeakingRecording() {
    const micBtn = document.getElementById("mic-btn");
    const timerDisplay = document.getElementById("speaking-timer");
    const transcriptBox = document.getElementById("speech-transcript");

    if (!this.isRecording) {
      // Start recording
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        this.showToast("Trình duyệt không hỗ trợ Web Speech API. Bạn vẫn có thể luyện nói trực tiếp với đồng hồ!", "error");
      } else {
        this.speechRecognition = new SpeechRecognition();
        this.speechRecognition.continuous = true;
        this.speechRecognition.interimResults = true;
        this.speechRecognition.lang = "en-US";

        this.speechRecognition.onresult = (event) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          if (transcriptBox) transcriptBox.textContent = transcript;
        };

        this.speechRecognition.onerror = (err) => {
          console.warn("Speech recognition error:", err);
        };

        try {
          this.speechRecognition.start();
        } catch (e) {}
      }

      this.isRecording = true;
      micBtn.classList.add("recording");
      this.speechSeconds = 0;
      this.speechTimer = setInterval(() => {
        this.speechSeconds++;
        const mins = Math.floor(this.speechSeconds / 60).toString().padStart(2, "0");
        const secs = (this.speechSeconds % 60).toString().padStart(2, "0");
        timerDisplay.textContent = `${mins}:${secs}`;

        if (this.speechSeconds >= 120) {
          this.toggleSpeakingRecording(); // Stop at 2 mins
          this.showToast("Đã hoàn thành thử thách 2 phút nói liên tục!", "success");
        }
      }, 1000);

      this.showToast("Bắt đầu thử thách nói Part 2! Hãy trình bày tự tin theo 4 ý trên cue card.");
    } else {
      // Stop recording
      this.isRecording = false;
      micBtn.classList.remove("recording");
      clearInterval(this.speechTimer);
      if (this.speechRecognition) {
        try { this.speechRecognition.stop(); } catch (e) {}
      }

      if (this.speechSeconds >= 60) {
        this.addXp(200, "Hoàn thành lượt nói Speaking Part 2");
      }
    }
  }

  /* 8. Band Predictor */
  updateBandPredictionFromSliders() {
    const l = parseFloat(document.getElementById("slider-l")?.value || 6.5);
    const r = parseFloat(document.getElementById("slider-r")?.value || 6.5);
    const w = parseFloat(document.getElementById("slider-w")?.value || 6.0);
    const s = parseFloat(document.getElementById("slider-s")?.value || 6.0);

    document.getElementById("val-l").textContent = l.toFixed(1);
    document.getElementById("val-r").textContent = r.toFixed(1);
    document.getElementById("val-w").textContent = w.toFixed(1);
    document.getElementById("val-s").textContent = s.toFixed(1);

    const rawAverage = (l + r + w + s) / 4;
    // IELTS Rounding Rule
    const decimal = rawAverage - Math.floor(rawAverage);
    let finalBand = Math.floor(rawAverage);
    if (decimal >= 0.75) finalBand += 1.0;
    else if (decimal >= 0.25) finalBand += 0.5;

    document.getElementById("predicted-overall-band").textContent = finalBand.toFixed(1);
    
    this.state.scores = { listening: l, reading: r, writing: w, speaking: s };
    this.state.estimatedBand = finalBand;
    this.saveState();
  }
}

// Global instance
let app;
window.addEventListener("DOMContentLoaded", () => {
  app = new IELTSQuestApp();
});
