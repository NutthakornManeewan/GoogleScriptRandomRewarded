function RewardedScript() {
  var messageTitleForParticipants = "ยินดีด้วยคุณคือผู้โชคดี!";
  var messageBodyForParticipants = "คุณคือผู้โชคดีได้รับรางวัลลำดับที่ ";
  var messageToAdmin = "";

  var startRow = 2;
  var participantsNumber = 10;
  var interestingColumn = 3;
  var rewardedNumber = 3;
  var rewardedPaticipant = [];

  var sheet = SpreadsheetApp.getActiveSheet();
  var dataRange = sheet.getRange(
    startRow,
    1,
    participantsNumber,
    interestingColumn
  );
  var data = dataRange.getValues();

  for (var x = 0; x < rewardedNumber; x++) {
    var random = Math.floor(Math.random() * participantsNumber);
    while (
      rewardedPaticipant.some(function(par) {
        return random === par;
      })
    ) {
      random = Math.floor(Math.random() * participantsNumber);
    }
    rewardedPaticipant.push(random);
  }
  var counter = rewardedNumber;
  for (i in data) {
    var row = data[i];
    if (
      rewardedPaticipant.some(function(par, idx) {
        return parseInt(par) === parseInt(i);
      })
    ) {
      var emailAddress = row[1];
      MailApp.sendEmail(
        emailAddress,
        messageTitleForParticipants,
        messageBodyForParticipants + counter
      );
      var sequence = parseInt(i) + 1;
      messageToAdmin +=
        "No: " +
        sequence +
        " | " +
        emailAddress +
        " | " +
        "ผู้โชคดีลำดับที่ " +
        counter +
        "\n";
      counter--;
    }
  }
  MailApp.sendEmail(
    "natthakorn.pao@gmail.com",
    "admin-message",
    messageToAdmin
  );
}
