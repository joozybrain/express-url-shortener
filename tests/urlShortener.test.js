const mongoose = require("mongoose");
const URL = require("../model/URL_model");
const app = require("../app");
const request = require("supertest");

describe("testing urlShortener endpoints", () => {
  let db;

  // before running all tests, we need to connect to the DB.
  beforeAll(async () => {
    //const dbUri = "mongodb://localhost/express_blog_api_test_db";
    db = await mongoose.connect(
      "mongodb://localhost/express_url_shortener_test",
      () => {
        console.log("connected to test DB successfully");
      }
    );

    await URL.deleteMany().exec();
    // delete all books. we do this everytime the tests run so that our database is in a clean state
    // this will ensure that any passes/failures are a direct result of
    // our code, and not because of data (which may or may not be there)
  });

  it.only("GET should return all urls in the database", async () => {
    const urlList = await URL.find({});
    const response = request(app).get("/").expect(404)
    return response;
    
  });

  it("POST should redirect to a valid URL", async () => {
    const URL = "www.google.com";

    const response = await request(app)
      .post("/")
      .send({ url: URL });

    expect(response.status).toBe(200);
  });

  it("GET /books should return status of 200 and all books in the test DB", async () => {
    const expectedBooks = await Book.find({});

    const response = await request(app).get("/books");

    expect(response.status).toEqual(200);
    expect(response.header["content-type"]).toContain("application/json");
    expect(response.body).toEqual(expectedBooks);
  });

  // we delete all books and close the connection to the database after every run of the tests
  // otherwise, we'll have hundreds of open connections to our db (this is what mongoose.connect() does)
  // after jest runs our test hundreds of times
  afterAll(async () => {
    await Book.deleteMany().exec();
    await db.close();
  });
});
