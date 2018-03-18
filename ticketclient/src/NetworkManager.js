

export var NetworkManager =
  {
    state: {
     // url: 'http://127.0.0.1:5000/api/'
     url: '/api/'
    },

    getInfo: function (addr, callbackFn, id, obj) {
      if (addr === undefined) return;

      var urle = this.state.url + addr;
	

      if (id !== undefined) {
        urle += "/" + id;
      }

      if (obj !== undefined)
      {
        urle += "?";
        Object.keys(obj).forEach(key => urle += key + "="+ obj[key] + '&');
      }
      var w = fetch(urle).then(o => callbackFn(o));

    },



    sendInfo: function (addr, obj, endFunc) {
      let requestUrl = this.state.url + (addr === undefined ? '' : addr) + '/';

      fetch(requestUrl,
        {
          method: 'post',
          headers:
            {
              "Content-type": "application/json; charset=UTF-8"
            },

          body: JSON.stringify(obj)
        }).then(q => endFunc(q))
    },

    updateInfo: function (addr, obj) {
      let requestUrl = this.state.url + (addr === undefined ? '' : addr) + '/';
      fetch(requestUrl,
        {
          method: 'put',
          headers:
            {
              "Content-type": "application/json; charset=UTF-8"
            },
          body: JSON.stringify(obj)
        }
      );
    },

    deleteInfo: function (addr, id,callbackFn) {
      
      if (id === undefined || addr === undefined) return;

      let requestUrl = this.state.url;
      console.log(requestUrl);

      requestUrl += addr + '/' + (id === undefined ? '' : id)
      
      fetch(requestUrl,
        {
          method: 'delete',
          headers:
            {
              "Content-type": "application/json; charset=UTF-8"
            },
        }
      ).then(o=>callbackFn(o));
    },

  }

