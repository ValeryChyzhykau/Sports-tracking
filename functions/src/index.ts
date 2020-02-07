import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

exports.addAdminRole = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });
    return {
      message: `Success! ${data.email} has been made an admin.`
    };
  } catch (err) {
    return err;
  }
});
