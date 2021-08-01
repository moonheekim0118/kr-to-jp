describe("한본어 번역기", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("올바르게 입력된 한글에 대한 번역을 한다.", () => {
    beforeEach(() => {
      cy.get(".korean-textarea").clear().type("아리가또고자이마스");
    });

    it("히라가나로 변환이 제대로 된다", () => {
      cy.clock();
      cy.tick(9000, () => {
        cy.get(".result").should("eq", "ありがとございます");
      });
    });

    it("히라가나가 한글로 번역이 된다.", () => {
      cy.clock();
      cy.tick(9000, () => {
        cy.get(".result-card").innerText.should("eq", "감사합니다.");
      });
    });
  });

  context("새로고침 후 결과를 유지한다.", () => {
    it("타입 후 새로고침을 해도 모든 결과를 유지한다.", () => {
      cy.get(".korean-textarea").clear().type("아리가또고자이마스");
      cy.clock();
      cy.tick(9000, () => {
        cy.reload();
        cy.get(".korean-textarea").should("eq", "아리가또고자이마스");
        cy.get(".result").should("eq", "ありがとございます");
        cy.get(".result-card").innerText.should("eq", "감사합니다.");
      });
    });
  });
});
