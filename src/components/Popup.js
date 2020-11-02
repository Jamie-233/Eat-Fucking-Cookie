import React, { Component } from 'react';
import Filter from './heapers.js';
// let lists = ['Alice', 'Emily', 'Kate'];

class Popup extends Component {
  constructor(props) {
    super(props);
    this.currentTabURL = '';
    this.currentTabID = null;
    this.cookieList = [];
    this.state = {
      data: this.cookieList,
    };
  };

  doSearch(isSeparateWindow) {
    let url = document.getElementById('url').innerText;
    if (url.length < 3) return;
    let filter = new Filter();
    if (/^https?:\/\/.+$/.test(url)) {
      filter.setUrl(url);
    }
    else {
      filter.setDomain(url);
    }
    this.createList(filter.getFilter(), isSeparateWindow);
  }

  getUrl() {
    let d = [], c;
    let a = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
    for (let b = 0; b < a.length; b++) {
      c = a[b].split("=");
      d.push(c[0]);
      d[c[0]] = c[1];
    }
    return d;
  }

  start() {
    let args = this.getUrl();
    if(args.url === undefined) {
      chrome.tabs.query({
          active:true,
          currentWindow: true
        },
        (tabs) => {
          this.currentTabURL = tabs[0].url;
          this.currentTabID = tabs[0].id;
          document.getElementById('url').innerText = this.currentTabURL;
          this.doSearch(false);
        }
      );
    }
  }

  createList(filters, isSeparateWindow) {
    let filteredCookies = [];
    if(filters === null) filters = {};

    let filterURL = {};
    if(filters.url !== undefined) filterURL.url = filters.url;
    if(filters.domain !== undefined) filterURL.domain = filters.url;

    chrome.cookies.getAllCookieStores((cookieStores) => {
      // console.log('currentTabID', this.currentTabID);
      for (let i = 0; i < cookieStores.length; i++) {
        console.log(cookieStores[i]);
        if(cookieStores[i].tabIds.indexOf(this.currentTabID) !== -1) {
          filterURL.storeId = cookieStores[i].id;
          break;
        }
      }
      // console.log('filterURL', filterURL);
      chrome.cookies.getAll(filterURL, (cks) => {
        let currentC;
        for (let i = 0; i < cks.length; i++) {
          currentC = cks[i];
          if(filters.name !== undefined && currentC.name.toLowerCase().indexOf(filters.name.toLowerCase()) === -1) continue;
          if(filters.domain !== undefined && currentC.domain.toLowerCase().indexOf(filters.domain.toLowerCase()) === -1) continue;
          if(filters.secure !== undefined && currentC.secure.toLowerCase().indexOf(filters.secure.toLowerCase()) === -1) continue;
          if(filters.session !== undefined && currentC.session.toLowerCase().indexOf(filters.session.toLowerCase()) === -1) continue;
          // console.log('ck', cks[i]);
          filteredCookies.push(currentC);
        }
        filteredCookies.forEach((ck, i) => {
          // console.log(ck);
          this.cookieList.push(`<div key=${i}>${ ck.name }</div>`);
        })
      });
    })
  }

  // componentWillMount() {
  //   this.setState({
  //     currentColor: .defaultColor,
  //     palette: 'rgb',
  //   });
  // }

  // getInitialState() {
  //   return {
  //     info: {}
  //   };
  // }

  render() {
    this.start();

    return (
      <div style={styles.main}>
        <h2 id="url"></h2>
        {this.state.data}
        {this.cookieList}
      </div>
    )
  }
}

const styles = {
  main: {
    width: '300px',
    height: '600px',
    overflow: 'hidden'
  }
}

export default Popup;
