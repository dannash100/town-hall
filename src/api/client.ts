const feathers = require("@feathersjs/feathers");
const rest = require("@feathersjs/rest-client");
const auth = require("@feathersjs/authentication-client");
const axios = require("axios");

export const client = feathers();

const urls = {
  development: "http://localhost:3030",
  test: "http://localhost:3030",
  production: "https://serene-fjord-70218.herokuapp.com",
};

// Connect to the same as the browser URL (only in the browser)
const restClient = rest(urls[process.env.NODE_ENV]);

client.configure(auth({ storageKey: "feathers-jwt" }));

// Configure an AJAX library (see below) with that client;
client.configure(restClient.axios(axios));

export const userService = client.service('users');
export const postService = client.service('post');
export const tagService = client.service('tag');
export const postToTagService = client.service('posts-tags')