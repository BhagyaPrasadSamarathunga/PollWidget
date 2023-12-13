const assert = require("assert");
const poll = require("../poll.js");

describe("Poll question", () => {
    it("successfully render the poll question", () => {
      // Inputs
      const question = "How you like the Opinary test";
      const id = 1;
      const expected = ` <p class="poll-question">How you like the Opinary test</p> `;
  
      // render question
      const result = poll.Question(question);
  
      // Verify
      assert.strictEqual(result.replace(/\s/g, ""), expected.replace(/\s/g, ""));
    });
  });

describe("Poll answers", () => {
    it("successfully render the poll answers", () => {
      // Inputs
      const answer = "It was great and so challenging";
      const id = 1;
      const votesCount = 20;
      const voteId = 1;
      const totalVotes = 45;
      const isDisabled = false;

      const expected = ` <li>
      <button class="poll-answer-button voted" data-id="1">
          <span class="poll-answer-label">It was great and so challenging</span>
      </button>
      <div class="progress-container">
      <div class="progress-bar-container">
      <div class="progress-bar"  id="myProgressBar" style="width:44.44444444444444%;"/> </div>
      </div>
      <span class="vote-count">20 votes</span>
      </div>
     
  </li>`;
  
      // render answer row
      const result = poll.AnswerRow(answer, id, votesCount, voteId, totalVotes, isDisabled);
  
      // Verify
      assert.strictEqual(result.replace(/\s/g, ""), expected.replace(/\s/g, ""));
    });
  });


  describe("get total vote count", () => {
    it("get correct total vote count", () => {
      // Inputs
      const votes = {0: 3, 1:1,  2:5};
      const numOfAnswers = 3;

      const expected = 9;
  
      // render answer row
      const result = poll.getTotalVotesCount(votes, numOfAnswers);
  
      // Verify
      assert.strictEqual(result, expected);
    });
  });