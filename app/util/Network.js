class Network {
  constructor() {
    this.post = this.post.bind(this);
  }

  async post(url) {
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      return responseJson.movies;
    } catch (error) {
      // console.error(error);
    }
  }
}

export default new Network();
