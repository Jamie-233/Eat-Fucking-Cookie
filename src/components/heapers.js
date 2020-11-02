class Filter {
  constructor() {
    this.filter = {};
  }

  setUrl(url) {
    this.filter.url = url;
  }

  setDomain(domain) {
    this.filter.domain = domain;
  }

  setName(name) {
    this.filter.name = name;
  }

  setSecure(secure) {
    this.filter.secure = secure;
  }

  setSession(session) {
    this.filter.session = session;
  }

  getFilter(session) {
    return this.filter;
  }
}

export default Filter;
