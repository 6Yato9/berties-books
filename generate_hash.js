// Quick script to generate bcrypt hash for default user password
const bcrypt = require("bcrypt");

const password = "smiths";
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function (err, hash) {
  if (err) {
    console.error("Error generating hash:", err);
  } else {
    console.log("Password: smiths");
    console.log("Hash:", hash);
    console.log("\nSQL INSERT statement:");
    console.log(
      `INSERT INTO users (username, first_name, last_name, email, hashedPassword) VALUES ('gold', 'Gold', 'Smiths', 'gold@example.com', '${hash}');`
    );
  }
  process.exit();
});
