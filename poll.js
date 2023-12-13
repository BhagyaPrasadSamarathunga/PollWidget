function initPoll(domElement, poll) {
    var currentPollId = null;

  renderPoll(false, poll, currentPollId, domElement);

  const pollHandler = (e) => {
    if (e.target.matches("button")) {
      saveToLocalstorage(poll, e.target.dataset.id);
      currentPollId = parseInt(e.target.dataset.id);
      renderPoll(true, poll, currentPollId, domElement);
      domElement.removeEventListener("click", handler);
    }
  };

  domElement.addEventListener("click", pollHandler);
}

function renderPoll(isDisabled, poll, currentPollId, domElement) {
    const votes = getVotesFromLocalstorage(poll);

    const totalVotes = getTotalVotesCount(votes, poll.answers.length);
    const pollAnswers = poll.answers
    .map((answer, index) => AnswerRow(answer, index, votes[index], currentPollId, totalVotes, isDisabled))
    .join("");

    const question = Question(poll.question);

    domElement.innerHTML = `
    <div data-poll-id="${poll.id}" class="poll-container">
        ${question}
        <ul class="poll-answers">${pollAnswers}</ul>
    </div>
`;
}

function Question(question) {
    return `<p class="poll-question">${question}</p>`;
}

function AnswerRow(answer, id, votesCount, voteId, totalVotes, isDisabled) {

    const renderedVotes = votesCount > 1 ? ` ${votesCount} votes` : ` ${votesCount} vote`;
    const classNames = id === voteId ? "poll-answer-button voted" : "poll-answer-button";
    const progressBarWidth = (votesCount/totalVotes * 100);

    return `
    <li>
        <button class="${classNames}" data-id="${id}" ${isDisabled ? "disabled" : ""}>
            <span class="poll-answer-label">${answer}</span>
        </button>
        <div class="progress-container">
        <div class="progress-bar-container">
        <div class="progress-bar"  id="myProgressBar" style="width:${progressBarWidth}%;"/> </div>
        </div>
        <span class="vote-count">${renderedVotes}</span>
        </div>
       
    </li>`;
}

function saveToLocalstorage(poll, answerId) {
    let currentVotes = [];
    try {
      currentVotes = getVotesFromLocalstorage(poll);
      const serializedAnswers = JSON.stringify({
        ...currentVotes,
        [answerId]: currentVotes[answerId] + 1,
      });
      localStorage.setItem(`votes-${poll.id}`, serializedAnswers);
    } catch (error) {
      console.log(error);
    }
  }

  function getVotesFromLocalstorage(poll) {
    try {
      let votes = JSON.parse(localStorage.getItem(`votes-${poll.id}`));
      if (votes === null) {
        votes = {};
        for (let i = 0; i < poll.answers.length; i++) {
          votes[i] = 0;
        }
      }
      return votes;
    } catch (error) {
      console.log(error);
    }
  }

  const getTotalVotesCount = (votes, numOfAnswers) => {
    console.log("votes -->", votes);
    console.log("numOfAnswers -->", numOfAnswers);

    var count = 0;
    for (let i = 0; i < numOfAnswers; i++) {
       count = count + votes[i];
    }

    return count;
  }

  if (typeof exports !== "undefined") {
    exports.AnswerRow = AnswerRow;
    exports.Poll = renderPoll;
    exports.Question = Question;
    exports.getTotalVotesCount = getTotalVotesCount;
  }

  