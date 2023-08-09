window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  CryptoJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33efeVfiSdE64AwyLyRWVIc", "CryptoJS");
    "use strict";
    var CryptoJS = CryptoJS || function(u, p) {
      var d = {}, l = d.lib = {}, s = function s() {}, t = l.Base = {
        extend: function extend(a) {
          s.prototype = this;
          var c = new s();
          a && c.mixIn(a);
          c.hasOwnProperty("init") || (c.init = function() {
            c.$super.init.apply(this, arguments);
          });
          c.init.prototype = c;
          c.$super = this;
          return c;
        },
        create: function create() {
          var a = this.extend();
          a.init.apply(a, arguments);
          return a;
        },
        init: function init() {},
        mixIn: function mixIn(a) {
          for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function clone() {
          return this.init.prototype.extend(this);
        }
      }, r = l.WordArray = t.extend({
        init: function init(a, c) {
          a = this.words = a || [];
          this.sigBytes = c != p ? c : 4 * a.length;
        },
        toString: function toString(a) {
          return (a || v).stringify(this);
        },
        concat: function concat(a) {
          var c = this.words, e = a.words, j = this.sigBytes;
          a = a.sigBytes;
          this.clamp();
          if (j % 4) for (var k = 0; k < a; k++) c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - k % 4 * 8 & 255) << 24 - (j + k) % 4 * 8; else if (65535 < e.length) for (k = 0; k < a; k += 4) c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e);
          this.sigBytes += a;
          return this;
        },
        clamp: function clamp() {
          var a = this.words, c = this.sigBytes;
          a[c >>> 2] &= 4294967295 << 32 - c % 4 * 8;
          a.length = u.ceil(c / 4);
        },
        clone: function clone() {
          var a = t.clone.call(this);
          a.words = this.words.slice(0);
          return a;
        },
        random: function random(a) {
          for (var c = [], e = 0; e < a; e += 4) c.push(4294967296 * u.random() | 0);
          return new r.init(c, a);
        }
      }), w = d.enc = {}, v = w.Hex = {
        stringify: function stringify(a) {
          var c = a.words;
          a = a.sigBytes;
          for (var e = [], j = 0; j < a; j++) {
            var k = c[j >>> 2] >>> 24 - j % 4 * 8 & 255;
            e.push((k >>> 4).toString(16));
            e.push((15 & k).toString(16));
          }
          return e.join("");
        },
        parse: function parse(a) {
          for (var c = a.length, e = [], j = 0; j < c; j += 2) e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << 24 - j % 8 * 4;
          return new r.init(e, c / 2);
        }
      }, b = w.Latin1 = {
        stringify: function stringify(a) {
          var c = a.words;
          a = a.sigBytes;
          for (var e = [], j = 0; j < a; j++) e.push(String.fromCharCode(c[j >>> 2] >>> 24 - j % 4 * 8 & 255));
          return e.join("");
        },
        parse: function parse(a) {
          for (var c = a.length, e = [], j = 0; j < c; j++) e[j >>> 2] |= (255 & a.charCodeAt(j)) << 24 - j % 4 * 8;
          return new r.init(e, c);
        }
      }, x = w.Utf8 = {
        stringify: function stringify(a) {
          try {
            return decodeURIComponent(escape(b.stringify(a)));
          } catch (c) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function parse(a) {
          return b.parse(unescape(encodeURIComponent(a)));
        }
      }, q = l.BufferedBlockAlgorithm = t.extend({
        reset: function reset() {
          this._data = new r.init();
          this._nDataBytes = 0;
        },
        _append: function _append(a) {
          "string" == typeof a && (a = x.parse(a));
          this._data.concat(a);
          this._nDataBytes += a.sigBytes;
        },
        _process: function _process(a) {
          var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((0 | b) - this._minBufferSize, 0);
          a = b * k;
          j = u.min(4 * a, j);
          if (a) {
            for (var q = 0; q < a; q += k) this._doProcessBlock(e, q);
            q = e.splice(0, a);
            c.sigBytes -= j;
          }
          return new r.init(q, j);
        },
        clone: function clone() {
          var a = t.clone.call(this);
          a._data = this._data.clone();
          return a;
        },
        _minBufferSize: 0
      });
      l.Hasher = q.extend({
        cfg: t.extend(),
        init: function init(a) {
          this.cfg = this.cfg.extend(a);
          this.reset();
        },
        reset: function reset() {
          q.reset.call(this);
          this._doReset();
        },
        update: function update(a) {
          this._append(a);
          this._process();
          return this;
        },
        finalize: function finalize(a) {
          a && this._append(a);
          return this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function _createHelper(a) {
          return function(b, e) {
            return new a.init(e).finalize(b);
          };
        },
        _createHmacHelper: function _createHmacHelper(a) {
          return function(b, e) {
            return new n.HMAC.init(a, e).finalize(b);
          };
        }
      });
      var n = d.algo = {};
      return d;
    }(Math);
    (function() {
      var u = CryptoJS, p = u.lib.WordArray;
      u.enc.Base64 = {
        stringify: function stringify(d) {
          var l = d.words, p = d.sigBytes, t = this._map;
          d.clamp();
          d = [];
          for (var r = 0; r < p; r += 3) for (var w = (l[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255) << 8 | l[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255, v = 0; 4 > v && r + .75 * v < p; v++) d.push(t.charAt(w >>> 6 * (3 - v) & 63));
          if (l = t.charAt(64)) for (;d.length % 4; ) d.push(l);
          return d.join("");
        },
        parse: function parse(d) {
          var l = d.length, s = this._map, t = s.charAt(64);
          t && (t = d.indexOf(t), -1 != t && (l = t));
          for (var t = [], r = 0, w = 0; w < l; w++) if (w % 4) {
            var v = s.indexOf(d.charAt(w - 1)) << w % 4 * 2, b = s.indexOf(d.charAt(w)) >>> 6 - w % 4 * 2;
            t[r >>> 2] |= (v | b) << 24 - r % 4 * 8;
            r++;
          }
          return p.create(t, r);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
    })();
    (function(u) {
      function p(b, n, a, c, e, j, k) {
        b = b + (n & a | ~n & c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function d(b, n, a, c, e, j, k) {
        b = b + (n & c | a & ~c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function l(b, n, a, c, e, j, k) {
        b = b + (n ^ a ^ c) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      function s(b, n, a, c, e, j, k) {
        b = b + (a ^ (n | ~c)) + e + k;
        return (b << j | b >>> 32 - j) + n;
      }
      for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++) b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0;
      r = r.MD5 = v.extend({
        _doReset: function _doReset() {
          this._hash = new w.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
        },
        _doProcessBlock: function _doProcessBlock(q, n) {
          for (var a = 0; 16 > a; a++) {
            var c = n + a, e = q[c];
            q[c] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
          }
          var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]), f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f, m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m, E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]);
          a[0] = a[0] + f | 0;
          a[1] = a[1] + m | 0;
          a[2] = a[2] + g | 0;
          a[3] = a[3] + h | 0;
        },
        _doFinalize: function _doFinalize() {
          var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes;
          n[c >>> 5] |= 128 << 24 - c % 32;
          var e = u.floor(a / 4294967296);
          n[15 + (c + 64 >>> 9 << 4)] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8);
          n[14 + (c + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);
          b.sigBytes = 4 * (n.length + 1);
          this._process();
          b = this._hash;
          n = b.words;
          for (a = 0; 4 > a; a++) c = n[a], n[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
          return b;
        },
        clone: function clone() {
          var b = v.clone.call(this);
          b._hash = this._hash.clone();
          return b;
        }
      });
      t.MD5 = v._createHelper(r);
      t.HmacMD5 = v._createHmacHelper(r);
    })(Math);
    (function() {
      var u = CryptoJS, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({
        cfg: d.extend({
          keySize: 4,
          hasher: p.MD5,
          iterations: 1
        }),
        init: function init(d) {
          this.cfg = this.cfg.extend(d);
        },
        compute: function compute(d, r) {
          for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q; ) {
            n && s.update(n);
            var n = s.update(d).finalize(r);
            s.reset();
            for (var a = 1; a < p; a++) n = s.finalize(n), s.reset();
            b.concat(n);
          }
          b.sigBytes = 4 * q;
          return b;
        }
      });
      u.EvpKDF = function(d, l, p) {
        return s.create(p).compute(d, l);
      };
    })();
    CryptoJS.lib.Cipher || function(u) {
      var p = CryptoJS, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({
        cfg: l.extend(),
        createEncryptor: function createEncryptor(e, a) {
          return this.create(this._ENC_XFORM_MODE, e, a);
        },
        createDecryptor: function createDecryptor(e, a) {
          return this.create(this._DEC_XFORM_MODE, e, a);
        },
        init: function init(e, a, b) {
          this.cfg = this.cfg.extend(b);
          this._xformMode = e;
          this._key = a;
          this.reset();
        },
        reset: function reset() {
          t.reset.call(this);
          this._doReset();
        },
        process: function process(e) {
          this._append(e);
          return this._process();
        },
        finalize: function finalize(e) {
          e && this._append(e);
          return this._doFinalize();
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function _createHelper(e) {
          return {
            encrypt: function encrypt(b, k, d) {
              return ("string" == typeof k ? c : a).encrypt(e, b, k, d);
            },
            decrypt: function decrypt(b, k, d) {
              return ("string" == typeof k ? c : a).decrypt(e, b, k, d);
            }
          };
        }
      });
      d.StreamCipher = v.extend({
        _doFinalize: function _doFinalize() {
          return this._process(!0);
        },
        blockSize: 1
      });
      var b = p.mode = {}, x = function x(e, a, b) {
        var c = this._iv;
        c ? this._iv = u : c = this._prevBlock;
        for (var d = 0; d < b; d++) e[a + d] ^= c[d];
      }, q = (d.BlockCipherMode = l.extend({
        createEncryptor: function createEncryptor(e, a) {
          return this.Encryptor.create(e, a);
        },
        createDecryptor: function createDecryptor(e, a) {
          return this.Decryptor.create(e, a);
        },
        init: function init(e, a) {
          this._cipher = e;
          this._iv = a;
        }
      })).extend();
      q.Encryptor = q.extend({
        processBlock: function processBlock(e, a) {
          var b = this._cipher, c = b.blockSize;
          x.call(this, e, a, c);
          b.encryptBlock(e, a);
          this._prevBlock = e.slice(a, a + c);
        }
      });
      q.Decryptor = q.extend({
        processBlock: function processBlock(e, a) {
          var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c);
          b.decryptBlock(e, a);
          x.call(this, e, a, c);
          this._prevBlock = d;
        }
      });
      b = b.CBC = q;
      q = (p.pad = {}).Pkcs7 = {
        pad: function pad(a, b) {
          for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4) l.push(d);
          c = s.create(l, c);
          a.concat(c);
        },
        unpad: function unpad(a) {
          a.sigBytes -= 255 & a.words[a.sigBytes - 1 >>> 2];
        }
      };
      d.BlockCipher = v.extend({
        cfg: v.cfg.extend({
          mode: b,
          padding: q
        }),
        reset: function reset() {
          v.reset.call(this);
          var a = this.cfg, b = a.iv, a = a.mode;
          if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, 
          this._minBufferSize = 1;
          this._mode = c.call(a, this, b && b.words);
        },
        _doProcessBlock: function _doProcessBlock(a, b) {
          this._mode.processBlock(a, b);
        },
        _doFinalize: function _doFinalize() {
          var a = this.cfg.padding;
          if (this._xformMode == this._ENC_XFORM_MODE) {
            a.pad(this._data, this.blockSize);
            var b = this._process(!0);
          } else b = this._process(!0), a.unpad(b);
          return b;
        },
        blockSize: 4
      });
      var n = d.CipherParams = l.extend({
        init: function init(a) {
          this.mixIn(a);
        },
        toString: function toString(a) {
          return (a || this.formatter).stringify(this);
        }
      }), b = (p.format = {}).OpenSSL = {
        stringify: function stringify(a) {
          var b = a.ciphertext;
          a = a.salt;
          return (a ? s.create([ 1398893684, 1701076831 ]).concat(a).concat(b) : b).toString(r);
        },
        parse: function parse(a) {
          a = r.parse(a);
          var b = a.words;
          if (1398893684 == b[0] && 1701076831 == b[1]) {
            var c = s.create(b.slice(2, 4));
            b.splice(0, 4);
            a.sigBytes -= 16;
          }
          return n.create({
            ciphertext: a,
            salt: c
          });
        }
      }, a = d.SerializableCipher = l.extend({
        cfg: l.extend({
          format: b
        }),
        encrypt: function encrypt(a, b, c, d) {
          d = this.cfg.extend(d);
          var l = a.createEncryptor(c, d);
          b = l.finalize(b);
          l = l.cfg;
          return n.create({
            ciphertext: b,
            key: c,
            iv: l.iv,
            algorithm: a,
            mode: l.mode,
            padding: l.padding,
            blockSize: a.blockSize,
            formatter: d.format
          });
        },
        decrypt: function decrypt(a, b, c, d) {
          d = this.cfg.extend(d);
          b = this._parse(b, d.format);
          return a.createDecryptor(c, d).finalize(b.ciphertext);
        },
        _parse: function _parse(a, b) {
          return "string" == typeof a ? b.parse(a, this) : a;
        }
      }), p = (p.kdf = {}).OpenSSL = {
        execute: function execute(a, b, c, d) {
          d || (d = s.random(8));
          a = w.create({
            keySize: b + c
          }).compute(a, d);
          c = s.create(a.words.slice(b), 4 * c);
          a.sigBytes = 4 * b;
          return n.create({
            key: a,
            iv: c,
            salt: d
          });
        }
      }, c = d.PasswordBasedCipher = a.extend({
        cfg: a.cfg.extend({
          kdf: p
        }),
        encrypt: function encrypt(b, c, d, l) {
          l = this.cfg.extend(l);
          d = l.kdf.execute(d, b.keySize, b.ivSize);
          l.iv = d.iv;
          b = a.encrypt.call(this, b, c, d.key, l);
          b.mixIn(d);
          return b;
        },
        decrypt: function decrypt(b, c, d, l) {
          l = this.cfg.extend(l);
          c = this._parse(c, l.format);
          d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt);
          l.iv = d.iv;
          return a.decrypt.call(this, b, c, d.key, l);
        }
      });
    }();
    (function() {
      for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++) a[c] = 128 > c ? c << 1 : c << 1 ^ 283;
      for (var e = 0, j = 0, c = 0; 256 > c; c++) {
        var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ 255 & k ^ 99;
        l[e] = k;
        s[k] = e;
        var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k;
        t[e] = y << 24 | y >>> 8;
        r[e] = y << 16 | y >>> 16;
        w[e] = y << 8 | y >>> 24;
        v[e] = y;
        y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e;
        b[k] = y << 24 | y >>> 8;
        x[k] = y << 16 | y >>> 16;
        q[k] = y << 8 | y >>> 24;
        n[k] = y;
        e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1;
      }
      var H = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], d = d.AES = p.extend({
        _doReset: function _doReset() {
          for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++) if (j < d) e[j] = c[j]; else {
            var k = e[j - 1];
            j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[255 & k]) : (k = k << 8 | k >>> 24, 
            k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[255 & k], 
            k ^= H[j / d | 0] << 24);
            e[j] = e[j - d] ^ k;
          }
          c = this._invKeySchedule = [];
          for (d = 0; d < a; d++) j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>> 8 & 255]] ^ n[l[255 & k]];
        },
        encryptBlock: function encryptBlock(a, b) {
          this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l);
        },
        decryptBlock: function decryptBlock(a, c) {
          var d = a[c + 1];
          a[c + 1] = a[c + 3];
          a[c + 3] = d;
          this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s);
          d = a[c + 1];
          a[c + 1] = a[c + 3];
          a[c + 3] = d;
        },
        _doCryptBlock: function _doCryptBlock(a, b, c, d, e, j, l, f) {
          for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++) var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[255 & n] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[255 & g] ^ c[p++], t = d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[255 & h] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[255 & k] ^ c[p++], g = q, h = s, k = t;
          q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[255 & n]) ^ c[p++];
          s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[255 & g]) ^ c[p++];
          t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[255 & h]) ^ c[p++];
          n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[255 & k]) ^ c[p++];
          a[b] = q;
          a[b + 1] = s;
          a[b + 2] = t;
          a[b + 3] = n;
        },
        keySize: 8
      });
      u.AES = p._createHelper(d);
    })();
    CryptoJS.pad.ZeroPadding = {
      pad: function pad(a, c) {
        var b = 4 * c;
        a.clamp();
        a.sigBytes += b - (a.sigBytes % b || b);
      },
      unpad: function unpad(a) {
        for (var c = a.words, b = a.sigBytes - 1; !(c[b >>> 2] >>> 24 - b % 4 * 8 & 255); ) b--;
        a.sigBytes = b + 1;
      }
    };
    module.exports = CryptoJS;
    cc._RF.pop();
  }, {} ],
  HotUpdateModule: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1355b12LSNDRoLBi/wy9wU2", "HotUpdateModule");
    "use strict";
    var HotUpdateModule = cc.Class({
      extends: cc.Component,
      properties: {
        manifestUrl: cc.Asset,
        versionLabel: {
          default: null,
          type: cc.Label
        },
        _updating: false,
        _canRetry: false,
        _storagePath: ""
      },
      onLoad: function onLoad() {
        if (!cc.sys.isNative) return;
        this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "client";
        this.versionCompareHandle = function(versionA, versionB) {
          var vA = versionA.split(".");
          var vB = versionB.split(".");
          for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || 0);
            if (a === b) continue;
            return a - b;
          }
          return vB.length > vA.length ? -1 : 0;
        };
        this._am = new jsb.AssetsManager(this.manifestUrl.nativeUrl, this._storagePath, this.versionCompareHandle);
        this._am.setVerifyCallback(function(filePath, asset) {
          return true;
        });
        this.versionLabel && (this.versionLabel.string = "src:" + this._am.getLocalManifest().getVersion());
        cc.sys.os === cc.sys.OS_ANDROID, this._am.setMaxConcurrentTask(16);
      },
      onDestroy: function onDestroy() {
        if (!cc.sys.isNative) return;
        this._am.setEventCallback(null);
        this._am = null;
      },
      showLog: function showLog(msg) {
        cc.log("[HotUpdateModule][showLog]----" + msg);
      },
      retry: function retry() {
        if (!this._updating && this._canRetry) {
          this._canRetry = false;
          this._am.downloadFailedAssets();
        }
      },
      updateCallback: function updateCallback(event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          this.showLog("The local manifest file was not found, and the hot update was skipped.");
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_PROGRESSION:
          var percent = event.getPercent();
          if (isNaN(percent)) return;
          var msg = event.getMessage();
          this.disPatchRateEvent(percent, msg);
          this.showLog("updateCallback Update progress:" + percent + ", msg: " + msg);
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          this.showLog("Failed to download manifest file, skip hot update.");
          failed = true;
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          this.showLog("Already the latest version.");
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FINISHED:
          this.showLog("The update is over." + event.getMessage());
          this.disPatchRateEvent(1);
          needRestart = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FAILED:
          this.showLog("Update error." + event.getMessage());
          this._updating = false;
          this._canRetry = true;
          this._failCount++;
          this.retry();
          break;

         case jsb.EventAssetsManager.ERROR_UPDATING:
          this.showLog("Error during update:" + event.getAssetId() + ", " + event.getMessage());
          break;

         case jsb.EventAssetsManager.ERROR_DECOMPRESS:
          this.showLog("unzip error");
        }
        if (failed) {
          this._am.setEventCallback(null);
          this._updating = false;
        }
        if (needRestart) {
          this._am.setEventCallback(null);
          var searchPaths = jsb.fileUtils.getSearchPaths();
          var newPaths = this._am.getLocalManifest().getSearchPaths();
          Array.prototype.unshift.apply(searchPaths, newPaths);
          cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
          jsb.fileUtils.setSearchPaths(searchPaths);
          cc.audioEngine.stopAll();
          setTimeout(function() {
            cc.game.restart();
          }, 100);
        }
      },
      hotUpdate: function hotUpdate() {
        if (this._am && !this._updating) {
          this._am.setEventCallback(this.updateCallback.bind(this));
          if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            var url = this.manifestUrl.nativeUrl;
            cc.assetManager.md5Pipe && (url = cc.assetManager.md5Pipe.transformURL(url));
            this._am.loadLocalManifest(url);
          }
          this._failCount = 0;
          this._am.update();
          this._updating = true;
        }
      },
      checkCallback: function checkCallback(event) {
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          this.showLog("The local manifest file was not found, and the hot update was skipped.");
          this.hotUpdateFinish(true);
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          this.showLog("Failed to download manifest file, skip hot update.");
          this.hotUpdateFinish(false);
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          this.showLog("updated.");
          this.hotUpdateFinish(true);
          break;

         case jsb.EventAssetsManager.NEW_VERSION_FOUND:
          this.showLog("There is a new version, need to update");
          this._updating = false;
          this.hotUpdate();
          return;

         case jsb.EventAssetsManager.UPDATE_PROGRESSION:
          var percent = event.getPercent();
          if (isNaN(percent)) return;
          var msg = event.getMessage();
          this.showLog("checkCallback Update progress:" + percent + ", msg: " + msg);
          return;

         default:
          console.log("event.getEventCode():" + event.getEventCode());
          return;
        }
        this._am.setEventCallback(null);
        this._updating = false;
      },
      checkUpdate: function checkUpdate() {
        if (this._updating) {
          cc.log("Checking for updates...");
          return;
        }
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
          var url = this.manifestUrl.nativeUrl;
          cc.assetManager.md5Pipe && (url = cc.assetManager.md5Pipe.transformURL(url));
          this._am.loadLocalManifest(url);
        }
        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
          this.showLog("Failed to load manifest file");
          return;
        }
        this._am.setEventCallback(this.checkCallback.bind(this));
        this._am.checkUpdate();
        this._updating = true;
        this.disPatchRateEvent(.01);
      },
      hotUpdateFinish: function hotUpdateFinish(result) {
        cc.director.emit("HotUpdateFinish", result);
      },
      disPatchRateEvent: function disPatchRateEvent(percent) {
        percent > 1 && (percent = 1);
        cc.director.emit("HotUpdateRate", percent);
      }
    });
    cc._RF.pop();
  }, {} ],
  LoginView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "279d8WtB4RHzak/MgK2/4ZW", "LoginView");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        menuNode: {
          default: null,
          type: cc.Node
        },
        labelTips: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        this.menuNode.active = true;
      },
      onDestroy: function onDestroy() {},
      onEnable: function onEnable() {
        cc.director.on("HotUpdateFinish", this.onHotUpdateFinish, this);
        cc.director.on("HotUpdateRate", this.onHotUpdateRate, this);
      },
      onDisable: function onDisable() {
        cc.director.off("HotUpdateFinish", this.onHotUpdateFinish, this);
        cc.director.off("HotUpdateRate", this.onHotUpdateRate, this);
      },
      checkVersion: function checkVersion() {},
      onUpdateFinish: function onUpdateFinish() {
        this.menuNode.active = true;
        this.labelTips.string = "";
      },
      onHotUpdateFinish: function onHotUpdateFinish(param) {
        var result = param;
        result, this.onUpdateFinish();
      },
      onHotUpdateRate: function onHotUpdateRate(param) {
        var percent = param;
        percent > 1 && (percent = 1);
        this._updatePercent = percent;
        this.labelTips.string = "\u0110ANG TI\u1ebeN H\xc0NH C\u1eacP NH\u1eacT T\xc0I NGUY\xcaN GAME, TI\u1ebeN \u0110\u1ed8 C\u1eacP NH\u1eacT " + parseInt(1e4 * percent) / 100 + "%";
      },
      onBtnStartGame: function onBtnStartGame() {
        cc.director.loadScene("GameScence");
      },
      onBtnBill: function onBtnBill() {
        cc.director.loadScene("Game");
      }
    });
    cc._RF.pop();
  }, {} ],
  SoundMN: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0c31dVDu7FDyLicCRRPX1/X", "SoundMN");
    "use strict";
    var Sound = cc.Class({
      properties: {
        n: {
          default: "",
          type: cc.String
        },
        clip: {
          default: null,
          type: cc.AudioClip
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  "audio-manager": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a5358v+LMRMCKIcjoasrMOD", "audio-manager");
    "use strict";
    var AudioManager = cc.Class({
      extends: cc.Component,
      properties: {
        coinsWin: {
          default: null,
          type: cc.AudioClip
        },
        coinsInsert: {
          default: null,
          type: cc.AudioClip
        },
        diceSound: {
          default: null,
          type: cc.AudioClip
        },
        timerSound: {
          default: null,
          type: cc.AudioClip
        },
        bgSound: {
          default: null,
          type: cc.AudioClip
        }
      },
      statics: {
        instance: null
      },
      playbgSound: function playbgSound() {
        cc.audioEngine.playMusic(this.bgSound, false);
      },
      playCoinsWin: function playCoinsWin() {
        cc.audioEngine.playMusic(this.coinsWin, false);
      },
      playCoinsInsert: function playCoinsInsert() {
        cc.audioEngine.playEffect(this.coinsInsert, false);
      },
      playDiceSound: function playDiceSound() {
        cc.audioEngine.playEffect(this.diceSound, false);
      },
      playTimeSound: function playTimeSound() {
        cc.audioEngine.playEffect(this.timerSound, false);
      },
      playStop: function playStop(AudioClip) {
        if (!AudioClip) return;
      },
      onLoad: function onLoad() {
        AudioManager.instance = this;
      }
    });
    cc._RF.pop();
  }, {} ],
  coinAction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a32bb/iX2dPhavykvjiovIR", "coinAction");
    "use strict";
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if ("undefined" === typeof Symbol || null == o[Symbol.iterator]) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && "number" === typeof o.length) {
          it && (o = it);
          var i = 0;
          return function() {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if ("string" === typeof o) return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      "Object" === n && o.constructor && (n = o.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(o);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      (null == len || len > arr.length) && (len = arr.length);
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    var coinAction = cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        coinAction.instance = this;
      },
      start: function start() {},
      coinMoveForWin: function coinMoveForWin(arrayNode) {
        for (var _iterator = _createForOfIteratorHelperLoose(arrayNode), _step; !(_step = _iterator()).done; ) {
          var coinmove = _step.value;
          cc.tween(coinmove).repeat(1, cc.tween().to(2, {
            position: cc.v2(962.823, -800)
          })).start();
        }
      },
      coinMoveForLoss: function coinMoveForLoss(arrayNode) {
        for (var _iterator2 = _createForOfIteratorHelperLoose(arrayNode), _step2; !(_step2 = _iterator2()).done; ) {
          var coinmove = _step2.value;
          cc.tween(coinmove).repeat(1, cc.tween().to(2, {
            position: cc.v2(962, 1800)
          })).start();
        }
      },
      clearCoin_Tai: function clearCoin_Tai(coinmove1, defaultSprCoin1, taiNodestop, arrayTaiNode) {
        var _this = this;
        var posx = this.resultBetTaiXiu(-150, 150);
        var posy = this.resultBetTaiXiu(-80, 80);
        coinmove1.runAction(cc.sequence(cc.moveTo(.1, cc.v2(taiNodestop.x + posx, taiNodestop.y - posy)), cc.callFunc(function() {
          var coin = cc.instantiate(coinmove1);
          coin.setPosition(coinmove1.position);
          _this.node.addChild(coin);
          arrayTaiNode.push(coin);
          coinmove1.setPosition(defaultSprCoin1);
        })));
      },
      clearCoin_Xiu: function clearCoin_Xiu(coinmove1, defaultSprCoin1, xiaNodestop, arrayXuiNode) {
        var _this2 = this;
        var posx = this.resultBetTaiXiu(-150, 150);
        var posy = this.resultBetTaiXiu(-80, 80);
        coinmove1.runAction(cc.sequence(cc.moveTo(.1, cc.v2(xiaNodestop.x + posx, xiaNodestop.y - posy)), cc.callFunc(function() {
          var coin = cc.instantiate(coinmove1);
          coin.setPosition(coinmove1.position);
          _this2.node.addChild(coin);
          arrayXuiNode.push(coin);
          coinmove1.setPosition(defaultSprCoin1);
        })));
      },
      resultBetTaiXiu: function resultBetTaiXiu(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    });
    cc._RF.pop();
  }, {} ],
  coinStyle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a55adyXfNtAHK5NjaGbz+/d", "coinStyle");
    "use strict";
    var coinStyle = cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        coinStyle.instance = this;
      },
      start: function start() {},
      styleCoinFour: function styleCoinFour(coinArray, coin4, defaultSprCoin4) {
        coinArray[3].opacity = 0;
        var stop1 = cc.instantiate(coin4[0]);
        stop1.setPosition(coinArray[3].position);
        this.node.addChild(stop1);
        coinArray[3] = stop1;
        coinArray[3].setPosition(defaultSprCoin4);
      },
      styleCoinFive: function styleCoinFive(coinArray, coin5, defaultSprCoin5) {
        coinArray[4].opacity = 0;
        var stop1 = cc.instantiate(coin5[0]);
        stop1.setPosition(coinArray[4].position);
        this.node.addChild(stop1);
        coinArray[4] = stop1;
        coinArray[4].setPosition(defaultSprCoin5);
      },
      styleCoinSix: function styleCoinSix(coinArray, coin6, defaultSprCoin6) {
        coinArray[5].opacity = 0;
        var stop1 = cc.instantiate(coin6[0]);
        stop1.setPosition(this.coinArray[5].position);
        this.node.addChild(stop1);
        coinArray[5] = stop1;
        coinArray[5].setPosition(defaultSprCoin6);
      }
    });
    cc._RF.pop();
  }, {} ],
  coinSwitchlight: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ed0d5SvKslBv76fEcnatrGn", "coinSwitchlight");
    "use strict";
    var coinLight = cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        coinLight.instance = this;
      },
      coinLight: function coinLight(coinArray, coin4, defaultSprCoin4) {
        coinArray[3].opacity = 0;
        var stop = cc.instantiate(coin4[1]);
        stop.setPosition(coinArray[3].position);
        this.node.addChild(stop);
        coinArray[3] = stop;
        coinArray[3].setPosition(defaultSprCoin4);
      },
      coinSwitchLight: function coinSwitchLight(coinArray, coin5, defaultSprCoin5) {
        coinArray[4].opacity = 0;
        var stop = cc.instantiate(coin5[1]);
        stop.setPosition(coinArray[4].position);
        this.node.addChild(stop);
        coinArray[4] = stop;
        coinArray[4].setPosition(defaultSprCoin5);
      },
      coinLightSwitch: function coinLightSwitch(coinArray, coin6, defaultSprCoin6) {
        coinArray[5].opacity = 0;
        var stop = cc.instantiate(coin6[1]);
        stop.setPosition(coinArray[5].position);
        this.node.addChild(stop);
        coinArray[5] = stop;
        coinArray[5].setPosition(defaultSprCoin6);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  coinSwitch: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2206MgwYFFH43Rc4zJJVVU", "coinSwitch");
    "use strict";
    var coinSwith = cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        coinSwith.instance = this;
      },
      coinBet: function coinBet(coinArray, coin1, defaultSprCoin1) {
        coinArray[0].opacity = 0;
        var stop = cc.instantiate(coin1[1]);
        stop.setPosition(coinArray[0].position);
        this.node.addChild(stop);
        coinArray[0] = stop;
        coinArray[0].setPosition(defaultSprCoin1);
      },
      coinSwitch: function coinSwitch(coinArray, coin2, defaultSprCoin2) {
        coinArray[1].opacity = 0;
        var stop = cc.instantiate(coin2[1]);
        stop.setPosition(coinArray[1].position);
        this.node.addChild(stop);
        coinArray[1] = stop;
        coinArray[1].setPosition(defaultSprCoin2);
      },
      coinBetSwitch: function coinBetSwitch(coinArray, coin3, defaultSprCoin3) {
        coinArray[2].opacity = 0;
        var stop = cc.instantiate(coin3[1]);
        stop.setPosition(coinArray[2].position);
        this.node.addChild(stop);
        coinArray[2] = stop;
        coinArray[2].setPosition(defaultSprCoin3);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7130eyumnpLaJWgrpVBQo3h", "game");
    "use strict";
    var coinAction = require("coinAction"), shakeCub = require("shakeCub"), coinSwitch = require("coinSwitch"), coinLight = require("coinSwitchlight"), resultCubBet = require("resultCubBet"), normalCoin = require("normalCoin"), coinStyle = require("coinStyle"), CryptoJS = require("CryptoJS"), Sound = require("SoundMN");
    cc.Class({
      extends: cc.Component,
      properties: {
        musicSound: [ Sound ],
        sfxSound: [ Sound ],
        musicSource: {
          default: null,
          type: cc.AudioSource
        },
        sfxSource: {
          default: null,
          type: cc.AudioSource
        },
        musicSlider: {
          default: null,
          type: cc.Slider
        },
        sfxSlider: {
          default: null,
          type: cc.Slider
        },
        setting: {
          default: null,
          type: cc.Node
        },
        coin1: {
          default: [],
          type: [ cc.Prefab ]
        },
        coin2: {
          default: [],
          type: [ cc.Prefab ]
        },
        coin3: {
          default: [],
          type: [ cc.Prefab ]
        },
        coin4: {
          default: [],
          type: [ cc.Prefab ]
        },
        coin5: {
          default: [],
          type: [ cc.Prefab ]
        },
        coin6: {
          default: [],
          type: [ cc.Prefab ]
        },
        coinArray: {
          default: [],
          type: [ cc.Node ]
        },
        coinmoveArray: {
          default: [],
          type: [ cc.Node ]
        },
        valuecoin1: {
          default: true,
          visible: false,
          type: cc.Boolean
        },
        valuecoin2: {
          default: true,
          visible: false,
          type: cc.Boolean
        },
        valuecoin3: {
          default: true,
          visible: false,
          type: cc.Boolean
        },
        valuecoin4: {
          default: true,
          visible: false,
          type: cc.Boolean
        },
        valuecoin5: {
          default: true,
          visible: false,
          type: cc.Boolean
        },
        valuecoin6: {
          default: true,
          visible: false,
          type: cc.Boolean
        },
        taiNode: {
          default: null,
          type: cc.Node
        },
        xiaNode: {
          default: null,
          type: cc.Node
        },
        taiNodestop: {
          default: null,
          type: cc.Node
        },
        xiaNodestop: {
          default: null,
          type: cc.Node
        },
        arrayTaiNode: {
          default: [],
          visible: false,
          type: [ cc.Node ]
        },
        arrayXuiNode: {
          default: [],
          visible: false,
          type: [ cc.Node ]
        },
        valuecretedite: {
          default: 0,
          type: cc.Integer
        },
        creditLabel: {
          default: null,
          type: cc.Label
        },
        taiLabel: {
          default: null,
          type: cc.Label
        },
        xiuLabel: {
          default: null,
          type: cc.Label
        },
        taivalue: {
          default: 0,
          visible: false,
          type: cc.Integer
        },
        xiuvalue: {
          default: 0,
          visible: false,
          type: cc.Integer
        },
        cubArray: {
          default: [],
          type: [ cc.Node ]
        },
        timeLabel: {
          default: null,
          type: cc.Label
        },
        timecount: {
          default: 0,
          visible: false,
          type: cc.Integer
        },
        stopscub: {
          default: [],
          type: [ cc.Prefab ]
        },
        totalValuesDice: {
          default: 0,
          visible: false,
          type: cc.Integer
        },
        valueWin: {
          default: null,
          visible: false,
          type: cc.Integer
        },
        labelWin: {
          default: null,
          type: cc.Label
        },
        refnode: {
          default: null,
          type: cc.Node
        },
        exitnode: {
          default: null,
          type: cc.Node
        },
        Nodetaiwin: {
          default: null,
          type: cc.Node
        },
        NodeXiuwin: {
          default: null,
          type: cc.Node
        },
        TaiGlow: {
          default: null,
          type: cc.Animation
        },
        XiuGlow: {
          default: null,
          type: cc.Animation
        },
        copy: {
          default: null,
          type: cc.Node
        },
        md5Label: {
          default: null,
          type: cc.Label
        }
      },
      statics: {
        defaultSprCoin1: null,
        defaultSprCoin2: null,
        defaultSprCoin3: null,
        defaultSprCoin4: null,
        defaultSprCoin5: null,
        defaultSprCoin6: null
      },
      onLoad: function onLoad() {
        this.md5Label.string = CryptoJS.MD5("TAIXIUMD5");
        this.copy.on(cc.Node.EventType.TOUCH_START, this.copyMD5, this);
        this.PlayMusic("Music");
        this.allButtonFun();
        this.timeToBet();
      },
      timeToBet: function timeToBet() {
        this.timecount = 20;
        this.schedule(function() {
          this.valueWin = 0;
          if (this.timecount > 0) {
            this.PlaySFX("Time");
            this.timeLabel.string = "" + this.timecount;
            this.labelWin.string = this.valueWin + "K";
          }
          if (-1 == this.timecount) {
            this.cubArray[0].opacity = 0;
            this.cubArray[1].opacity = 0;
            this.cubArray[2].opacity = 0;
            this.timeLabel.string = "GO";
            this.cub();
          }
          this.timecount < 0 && this.timecount > -5 && this.PlaySFX("Dice");
          if (-7 == this.timecount) {
            this.totalfun();
            this.moveCoin();
            this.cubArray[0].opacity = 255;
            this.cubArray[1].opacity = 255;
            this.cubArray[2].opacity = 255;
          }
          if (-10 == this.timecount) {
            this.NodeXiuwin.opacity = 0;
            this.Nodetaiwin.opacity = 0;
            shakeCub.instance.clearArrayCoin(this.arrayTaiNode, this.arrayXuiNode);
            this.timecount = 20;
          }
          this.timecount--;
        }, 1);
      },
      totalfun: function totalfun() {
        if (this.totalValuesDice <= 10) {
          this.PlaySFX("Win");
          this.TaiGlow.play("winAnim");
          this.NodeXiuwin.opacity = 255;
          this.Nodetaiwin.opacity = 0;
          this.valueWin = 2 * this.xiuvalue;
          this.valuecretedite = this.valuecretedite + this.valueWin;
          this.labelWin.string = this.valueWin + "K";
          this.creditLabel.string = this.valuecretedite + "K";
          coinAction.instance.coinMoveForWin(this.arrayXuiNode);
          coinAction.instance.coinMoveForLoss(this.arrayTaiNode);
        } else {
          this.PlaySFX("Win");
          this.XiuGlow.play("winAnim");
          this.Nodetaiwin.opacity = 255;
          this.NodeXiuwin.opacity = 0;
          this.valueWin = 2 * this.taivalue;
          this.valuecretedite = this.valuecretedite + this.valueWin;
          this.labelWin.string = this.valueWin + "K";
          this.creditLabel.string = this.valuecretedite + "K";
          coinAction.instance.coinMoveForLoss(this.arrayXuiNode);
          coinAction.instance.coinMoveForWin(this.arrayTaiNode);
        }
      },
      coin1function: function coin1function() {
        if (true == this.valuecoin1) {
          this.PlaySFX("Tap");
          shakeCub.instance.betCoinSwitch(this.coinArray[0], this.coin1, this.defaultSprCoin1);
        }
      },
      coin2function: function coin2function() {
        if (true == this.valuecoin2) {
          this.PlaySFX("Tap");
          shakeCub.instance.betCoinSwitch(this.coinArray[1], this.coin2, this.defaultSprCoin2);
        }
      },
      coin3function: function coin3function() {
        if (true == this.valuecoin3) {
          this.PlaySFX("Tap");
          shakeCub.instance.betCoinSwitch(this.coinArray[2], this.coin3, this.defaultSprCoin3);
        }
      },
      coin4function: function coin4function() {
        if (true == this.valuecoin4) {
          this.PlaySFX("Tap");
          shakeCub.instance.betCoinSwitch(this.coinArray[3], this.coin4, this.defaultSprCoin4);
        }
      },
      coin5function: function coin5function() {
        if (true == this.valuecoin5) {
          this.PlaySFX("Tap");
          shakeCub.instance.betCoinSwitch(this.coinArray[4], this.coin5, this.defaultSprCoin5);
        }
      },
      coin6function: function coin6function() {
        if (true == this.valuecoin6) {
          this.PlaySFX("Tap");
          shakeCub.instance.betCoinSwitch(this.coinArray[5], this.coin6, this.defaultSprCoin6);
        }
      },
      coin1Bet: function coin1Bet() {
        if (true == this.valuecoin1) {
          coinSwitch.instance.coinBet(this.coinArray, this.coin1, this.defaultSprCoin1);
          this.valuecoin1 = false;
          this.valuecoin2 = true;
          this.valuecoin3 = true;
          this.valuecoin4 = true;
          this.valuecoin5 = true;
          this.valuecoin6 = true;
          this.coin2function();
          this.coin3function();
          this.coin4function();
          this.coin5function();
          this.coin6function();
        } else {
          normalCoin.instance.coinNormalOne(this.coinArray, this.coin1, this.defaultSprCoin1);
          this.valuecoin1 = true;
        }
      },
      coin2Bet: function coin2Bet() {
        if (true == this.valuecoin2) {
          coinSwitch.instance.coinSwitch(this.coinArray, this.coin2, this.defaultSprCoin2);
          this.valuecoin2 = false;
          this.valuecoin1 = true;
          this.valuecoin3 = true;
          this.valuecoin4 = true;
          this.valuecoin5 = true;
          this.valuecoin6 = true;
          this.coin1function();
          this.coin3function();
          this.coin4function();
          this.coin5function();
          this.coin6function();
        } else {
          this.valuecoin2 = true;
          normalCoin.instance.coinNormalTwo(this.coinArray, this.coin2, this.defaultSprCoin2);
        }
      },
      coin3Bet: function coin3Bet() {
        if (true == this.valuecoin3) {
          coinSwitch.instance.coinBetSwitch(this.coinArray, this.coin3, this.defaultSprCoin3);
          this.valuecoin3 = false;
          this.valuecoin1 = true;
          this.valuecoin2 = true;
          this.valuecoin4 = true;
          this.valuecoin5 = true;
          this.valuecoin6 = true;
          this.coin1function();
          this.coin2function();
          this.coin4function();
          this.coin5function();
          this.coin6function();
        } else {
          normalCoin.instance.coinNormalThree(this.coinArray, this.coin3, this.defaultSprCoin3);
          this.valuecoin3 = true;
        }
      },
      coin4Bet: function coin4Bet() {
        if (true == this.valuecoin4) {
          coinLight.instance.coinLight(this.coinArray, this.coin4, this.defaultSprCoin4);
          this.valuecoin4 = false;
          this.valuecoin1 = true;
          this.valuecoin2 = true;
          this.valuecoin3 = true;
          this.valuecoin5 = true;
          this.valuecoin6 = true;
          this.coin1function();
          this.coin2function();
          this.coin3function();
          this.coin5function();
          this.coin6function();
        } else {
          coinStyle.instance.styleCoinFour(this.coinArray, this.coin4, this.defaultSprCoin4);
          this.valuecoin4 = true;
        }
      },
      coin5Bet: function coin5Bet() {
        if (true == this.valuecoin5) {
          coinLight.instance.coinSwitchLight(this.coinArray, this.coin5, this.defaultSprCoin5);
          this.valuecoin5 = false;
          this.valuecoin1 = true;
          this.valuecoin2 = true;
          this.valuecoin3 = true;
          this.valuecoin4 = true;
          this.valuecoin6 = true;
          this.coin1function();
          this.coin2function();
          this.coin3function();
          this.coin4function();
          this.coin6function();
        } else {
          coinStyle.instance.styleCoinFive(this.coinArray, this.coin5, this.defaultSprCoin5);
          this.valuecoin5 = true;
        }
      },
      coin6Bet: function coin6Bet() {
        if (true == this.valuecoin6) {
          coinLight.instance.coinLightSwitch(this.coinArray, this.coin6, this.defaultSprCoin6);
          this.valuecoin6 = false;
          this.valuecoin1 = true;
          this.valuecoin2 = true;
          this.valuecoin3 = true;
          this.valuecoin4 = true;
          this.valuecoin5 = true;
          this.coin1function();
          this.coin2function();
          this.coin3function();
          this.coin4function();
          this.coin5function();
        } else {
          coinStyle.instance.styleCoinSix(this.coinArray, this.coin6, this.defaultSprCoin6);
          this.valuecoin6 = true;
        }
      },
      allButtonFun: function allButtonFun() {
        this.buttonanimation(this.taiNode);
        this.buttonanimation(this.xiaNode);
        this.buttonanimation(this.refnode);
        this.buttonanimation(this.exitnode);
        this.buttonanimation(this.coinArray[0]);
        this.buttonanimation(this.coinArray[1]);
        this.buttonanimation(this.coinArray[2]);
        this.buttonanimation(this.coinArray[3]);
        this.buttonanimation(this.coinArray[4]);
        this.buttonanimation(this.coinArray[5]);
        this.defaultSprCoin1 = this.coinArray[0].position;
        this.defaultSprCoin2 = this.coinArray[1].position;
        this.defaultSprCoin3 = this.coinArray[2].position;
        this.defaultSprCoin4 = this.coinArray[3].position;
        this.defaultSprCoin5 = this.coinArray[4].position;
        this.defaultSprCoin6 = this.coinArray[5].position;
        this.coinArray[0].on(cc.Node.EventType.TOUCH_START, this.coin1Bet, this);
        this.coinArray[1].on(cc.Node.EventType.TOUCH_START, this.coin2Bet, this);
        this.coinArray[2].on(cc.Node.EventType.TOUCH_START, this.coin3Bet, this);
        this.coinArray[3].on(cc.Node.EventType.TOUCH_START, this.coin4Bet, this);
        this.coinArray[4].on(cc.Node.EventType.TOUCH_START, this.coin5Bet, this);
        this.coinArray[5].on(cc.Node.EventType.TOUCH_START, this.coin6Bet, this);
        this.taiNode.on(cc.Node.EventType.TOUCH_START, this.Tai, this);
        this.xiaNode.on(cc.Node.EventType.TOUCH_START, this.Xiu, this);
        this.exitnode.on(cc.Node.EventType.TOUCH_START, this.exitFun, this);
        this.refnode.on(cc.Node.EventType.TOUCH_START, this.refreshScence, this);
      },
      Tai: function Tai() {
        if (this.timecount <= 0) return;
        if (false == this.valuecoin1) {
          this.PlaySFX("Insert");
          if (this.valuecretedite >= 1) {
            coinAction.instance.clearCoin_Tai(this.coinmoveArray[0], this.defaultSprCoin1, this.taiNodestop, this.arrayTaiNode);
            this.valuecretedite -= 1;
            this.taivalue += 1;
            this.taiLabel.string = this.taivalue + "K";
            this.creditLabel.string = this.valuecretedite + "K";
          }
        }
        if (false == this.valuecoin2 && this.valuecretedite >= 5) {
          this.PlaySFX("Insert");
          coinAction.instance.clearCoin_Tai(this.coinmoveArray[1], this.defaultSprCoin2, this.taiNodestop, this.arrayTaiNode);
          this.valuecretedite -= 5;
          this.taivalue += 5;
          this.taiLabel.string = this.taivalue + "K";
          this.creditLabel.string = this.valuecretedite + "K";
        }
        if (false == this.valuecoin3 && this.valuecretedite >= 10) {
          this.PlaySFX("Insert");
          coinAction.instance.clearCoin_Tai(this.coinmoveArray[2], this.defaultSprCoin3, this.taiNodestop, this.arrayTaiNode);
          this.valuecretedite -= 10;
          this.taivalue += 10;
          this.taiLabel.string = this.taivalue + "K";
          this.creditLabel.string = this.valuecretedite + "K";
        }
        if (false == this.valuecoin4 && this.valuecretedite >= 20) {
          this.PlaySFX("Insert");
          coinAction.instance.clearCoin_Tai(this.coinmoveArray[3], this.defaultSprCoin4, this.taiNodestop, this.arrayTaiNode);
          this.valuecretedite -= 20;
          this.taivalue += 20;
          this.taiLabel.string = this.taivalue + "K";
          this.creditLabel.string = this.valuecretedite + "K";
        }
        if (false == this.valuecoin5 && this.valuecretedite >= 50) {
          this.PlaySFX("Insert");
          coinAction.instance.clearCoin_Tai(this.coinmoveArray[4], this.defaultSprCoin5, this.taiNodestop, this.arrayTaiNode);
          this.valuecretedite -= 50;
          this.taivalue += 50;
          this.taiLabel.string = this.taivalue + "K";
          this.creditLabel.string = this.valuecretedite + "K";
        }
        if (false == this.valuecoin6 && this.valuecretedite >= 100) {
          this.PlaySFX("Insert");
          coinAction.instance.clearCoin_Tai(this.coinmoveArray[5], this.defaultSprCoin6, this.taiNodestop, this.arrayTaiNode);
          this.valuecretedite -= 100;
          this.taivalue += 100;
          this.taiLabel.string = this.taivalue + "K";
          this.creditLabel.string = this.valuecretedite + "K";
        }
      },
      Xiu: function Xiu() {
        if (this.timecount <= 0) return;
        if (false == this.valuecoin1) {
          this.PlaySFX("Insert");
          if (this.valuecretedite >= 1) {
            coinAction.instance.clearCoin_Xiu(this.coinmoveArray[0], this.defaultSprCoin1, this.xiaNodestop, this.arrayXuiNode);
            this.valuecretedite -= 1;
            this.xiuvalue += 1;
            this.xiuLabel.string = this.xiuvalue + "K";
            this.creditLabel.string = this.valuecretedite + "K";
            console.log(" check value :  ------- : " + this.xiuvalue);
          }
        }
        if (false == this.valuecoin2 && this.valuecretedite >= 5) {
          this.PlaySFX("Insert");
          coinAction.instance.clearCoin_Xiu(this.coinmoveArray[1], this.defaultSprCoin2, this.xiaNodestop, this.arrayXuiNode);
          this.valuecretedite -= 5;
          this.xiuvalue += 5;
          this.xiuLabel.string = this.xiuvalue + "K";
          this.creditLabel.string = this.valuecretedite + "K";
          console.log(" check value :  ------- : " + this.xiuvalue);
        }
        if (false == this.valuecoin3 && this.valuecretedite >= 10) {
          this.PlaySFX("Insert");
          coinAction.instance.clearCoin_Xiu(this.coinmoveArray[2], this.defaultSprCoin3, this.xiaNodestop, this.arrayXuiNode);
          this.valuecretedite -= 10;
          this.xiuvalue += 10;
          this.xiuLabel.string = this.xiuvalue + "K";
          this.creditLabel.string = this.valuecretedite + "K";
          console.log(" check value :  ------- : " + this.xiuvalue);
        }
        if (false == this.valuecoin4 && this.valuecretedite >= 20) {
          this.PlaySFX("Insert");
          coinAction.instance.clearCoin_Xiu(this.coinmoveArray[3], this.defaultSprCoin4, this.xiaNodestop, this.arrayXuiNode);
          this.valuecretedite -= 20;
          this.xiuvalue += 20;
          this.xiuLabel.string = this.xiuvalue + "K";
          this.creditLabel.string = this.valuecretedite + "K";
          console.log(" check value :  ------- : " + this.xiuvalue);
        }
        if (false == this.valuecoin5 && this.valuecretedite >= 50) {
          this.PlaySFX("Insert");
          coinAction.instance.clearCoin_Xiu(this.coinmoveArray[4], this.defaultSprCoin5, this.xiaNodestop, this.arrayXuiNode);
          this.valuecretedite -= 50;
          this.xiuvalue += 50;
          this.xiuLabel.string = this.xiuvalue + "K";
          this.creditLabel.string = this.valuecretedite + "K";
        }
        if (false == this.valuecoin6 && this.valuecretedite >= 100) {
          this.PlaySFX("Insert");
          coinAction.instance.clearCoin_Xiu(this.coinmoveArray[5], this.defaultSprCoin6, this.xiaNodestop, this.arrayXuiNode);
          this.valuecretedite -= 100;
          this.xiuvalue += 100;
          this.xiuLabel.string = this.xiuvalue + "K";
          this.creditLabel.string = this.valuecretedite + "K";
        }
      },
      cub: function cub() {
        var index1 = coinAction.instance.resultBetTaiXiu(0, 5);
        var index2 = coinAction.instance.resultBetTaiXiu(0, 5);
        var index3 = coinAction.instance.resultBetTaiXiu(0, 5);
        var stop3 = cc.instantiate(this.stopscub[index3]);
        this.node.addChild(stop3);
        stop3.setPosition(cc.v2(this.cubArray[2].position));
        this.cubArray[2] = stop3;
        shakeCub.instance.shakeCub3(this.cubArray[2]);
        var stop1 = cc.instantiate(this.stopscub[index1]);
        this.node.addChild(stop1);
        stop1.setPosition(cc.v2(this.cubArray[0].position));
        this.cubArray[0] = stop1;
        resultCubBet.instance.cubResultShake(this.cubArray[0]);
        var stop2 = cc.instantiate(this.stopscub[index2]);
        this.node.addChild(stop2);
        stop2.setPosition(cc.v2(this.cubArray[1].position));
        this.cubArray[1] = stop2;
        resultCubBet.instance.cub2(this.cubArray[1]);
        var valDice1 = 0;
        var valDice2 = 0;
        var valDice3 = 0;
        valDice1 = 0 == index1 ? 1 : 1 == index1 ? 2 : 2 == index1 ? 3 : 3 == index1 ? 4 : 4 == index1 ? 5 : 6;
        valDice2 = 0 == index2 ? 1 : 1 == index2 ? 2 : 2 == index2 ? 3 : 3 == index2 ? 4 : 4 == index2 ? 5 : 6;
        valDice3 = 0 == index3 ? 1 : 1 == index3 ? 2 : 2 == index3 ? 3 : 3 == index3 ? 4 : 4 == index3 ? 5 : 6;
        this.totalValuesDice = valDice1 + valDice2 + valDice3;
        this.md5Label.string = CryptoJS.MD5(this.totalValuesDiceChar);
      },
      copyMD5: function copyMD5() {
        console.log("MD5 Copy");
        if (cc.sys.os == cc.sys.OS_ANDROID) {
          console.log("copy");
          jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "copyText", "(Ljava/lang/String;)V", this.md5Label.string);
        }
      },
      moveCoin: function moveCoin() {
        this.taivalue = 0;
        this.xiuvalue = 0;
        this.taiLabel.string = "0K";
        this.xiuLabel.string = "0K";
      },
      buttonanimation: function buttonanimation(stop) {
        var button = stop.addComponent(cc.Button);
        button.transition = cc.Button.Transition.SCALE;
        button.duration = .1;
        button.zoomScale = 1.03;
      },
      start: function start() {
        this.valuecretedite = 2e3;
        this.creditLabel.string = this.valuecretedite + "K";
        this.coin1function();
        this.coin2function();
        this.coin3function();
        this.coin4function();
        this.coin5function();
        this.coin6function();
      },
      update: function update(dt) {},
      back: function back() {
        this.PlaySFX("Tap");
        cc.audioEngine.stopAll();
        cc.director.loadScene("load");
      },
      PlayMusic: function PlayMusic(name) {
        var s = this.musicSound.find(function(s) {
          return s.n === name;
        });
        if (null == s) console.log("not found"); else {
          this.musicSource.clip = s.clip;
          this.musicSource.play();
        }
      },
      PlaySFX: function PlaySFX(name) {
        var s = this.sfxSound.find(function(s) {
          return s.n === name;
        });
        if (null == s) console.log("not found"); else {
          this.sfxSource.clip = s.clip;
          this.sfxSource.play();
        }
      },
      MusicVolum: function MusicVolum() {
        this.musicSource.volume = this.musicSlider.progress;
        if (0 == this.musicSource.volume) {
          this.musicSprite.spriteFrame = this.offMusicSpriteFrame;
          this.state1 = false;
        } else {
          this.musicSprite.spriteFrame = this.onMusicSpriteFrame;
          this.state1 = true;
        }
      },
      SFXVolume: function SFXVolume() {
        this.sfxSource.volume = this.sfxSlider.progress;
        if (0 == this.sfxSource.volume) {
          this.sfxSprite.spriteFrame = this.offSFXSpriteFrame;
          this.state2 = false;
        } else {
          this.sfxSprite.spriteFrame = this.onSFXSpriteFrame;
          this.state2 = true;
        }
      },
      Show_stt: function Show_stt() {
        this.PlaySFX("Tap");
        this.setting.setPosition(0, 0);
      },
      Hide_stt: function Hide_stt() {
        this.PlaySFX("Tap");
        this.setting.setPosition(8e4, 932.136);
      }
    });
    cc._RF.pop();
  }, {
    CryptoJS: "CryptoJS",
    SoundMN: "SoundMN",
    coinAction: "coinAction",
    coinStyle: "coinStyle",
    coinSwitch: "coinSwitch",
    coinSwitchlight: "coinSwitchlight",
    normalCoin: "normalCoin",
    resultCubBet: "resultCubBet",
    shakeCub: "shakeCub"
  } ],
  normalCoin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "790c7io4AlEw5AqGD/a3k72", "normalCoin");
    "use strict";
    var normalCoin = cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        normalCoin.instance = this;
      },
      start: function start() {},
      coinNormalOne: function coinNormalOne(coinArray, coin1, defaultSprCoin1) {
        coinArray[0].opacity = 0;
        var stop1 = cc.instantiate(coin1[0]);
        stop1.setPosition(coinArray[0].position);
        this.node.addChild(stop1);
        coinArray[0] = stop1;
        coinArray[0].setPosition(defaultSprCoin1);
      },
      coinNormalTwo: function coinNormalTwo(coinArray, coin2, defaultSprCoin2) {
        this.coinArray[1].opacity = 0;
        var stop1 = cc.instantiate(coin2[0]);
        stop1.setPosition(coinArray[1].position);
        this.node.addChild(stop1);
        coinArray[1] = stop1;
        coinArray[1].setPosition(defaultSprCoin2);
      },
      coinNormalThree: function coinNormalThree(coinArray, coin3, defaultSprCoin3) {
        coinArray[2].opacity = 0;
        var stop1 = cc.instantiate(coin3[0]);
        stop1.setPosition(coinArray[2].position);
        this.node.addChild(stop1);
        coinArray[2] = stop1;
        coinArray[2].setPosition(defaultSprCoin3);
      }
    });
    cc._RF.pop();
  }, {} ],
  resultCubBet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "24f5eavLZJBd4YyK1GkM3EC", "resultCubBet");
    "use strict";
    var resultCubBet = cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        resultCubBet.instance = this;
      },
      start: function start() {},
      cubResultShake: function cubResultShake(stop) {
        var posx = stop.x;
        var posy = stop.y;
        cc.tween(stop).repeat(7, cc.tween().to(.2, {
          position: cc.v2(posx + 48, posy + 60),
          angle: 360
        }, {
          easing: "easeOutCubic"
        }).call(function() {}).to(.1, {
          position: cc.v2(posx + 80, posy + 140),
          angle: 360
        }, {
          easing: "easeOutCubic"
        }).call(function() {}).to(.1, {
          position: cc.v2(posx - 10, posy + 80),
          angle: 360
        }, {
          easing: "easeOutCubic"
        }).call(function() {}).to(.1, {
          position: cc.v2(posx, posy),
          angle: 0
        }, {
          easing: "easeOutCubic"
        })).start();
      },
      cub2: function cub2(stop) {
        var posx = stop.x;
        var posy = stop.y;
        cc.tween(stop).repeat(7, cc.tween().to(.2, {
          position: cc.v2(posx - 80, posy + 140),
          rotation: 360
        }, {
          easing: "easeOutCubic"
        }).call(function() {}).to(.1, {
          position: cc.v2(posx - 80, posy + 140),
          rotation: 360
        }, {
          easing: "easeOutCubic"
        }).call(function() {}).to(.1, {
          position: cc.v2(posx + 10, posy + 80),
          rotation: 360
        }, {
          easing: "easeOutCubic"
        }).call(function() {}).to(.1, {
          position: cc.v2(posx, posy),
          rotation: 0
        }, {
          easing: "easeOutCubic"
        })).start();
      }
    });
    cc._RF.pop();
  }, {} ],
  shakeCub: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e4c53voogBIaqcyX1swoQOs", "shakeCub");
    "use strict";
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if ("undefined" === typeof Symbol || null == o[Symbol.iterator]) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && "number" === typeof o.length) {
          it && (o = it);
          var i = 0;
          return function() {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if ("string" === typeof o) return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      "Object" === n && o.constructor && (n = o.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(o);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      (null == len || len > arr.length) && (len = arr.length);
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    var shakeCub = cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        shakeCub.instance = this;
      },
      start: function start() {},
      shakeCub3: function shakeCub3(stop) {
        var posx = stop.x;
        var posy = stop.y;
        cc.tween(stop).repeat(7, cc.tween().to(.2, {
          position: cc.v2(posx - 40, posy + 100),
          rotation: 360
        }, {
          easing: "easeOutCubic"
        }).call(function() {}).to(.1, {
          position: cc.v2(posx - 10, posy + 100),
          rotation: 360
        }, {
          easing: "easeOutCubic"
        }).call(function() {}).to(.1, {
          position: cc.v2(posx + 24, posy + 34),
          rotation: 360
        }, {
          easing: "easeOutCubic"
        }).call(function() {}).to(.1, {
          position: cc.v2(posx + 40, posy + 10),
          rotation: 0
        }, {
          easing: "easeOutCubic"
        }).call(function() {}).to(.1, {
          position: cc.v2(posx, posy),
          rotation: 0
        }, {
          easing: "easeOutCubic"
        })).start();
      },
      betCoinSwitch: function betCoinSwitch(coinNode1, coin1, defaultSprCoin1) {
        coinNode1.opacity = 0;
        var stop = cc.instantiate(coin1[0]);
        stop.setPosition(coinNode1.position);
        this.node.addChild(stop);
        coinNode1 = stop;
        coinNode1.setPosition(defaultSprCoin1);
      },
      clearArrayCoin: function clearArrayCoin(arrayTaiNode, arrayXuiNode) {
        for (var _iterator = _createForOfIteratorHelperLoose(arrayTaiNode), _step; !(_step = _iterator()).done; ) {
          var coinmove = _step.value;
          coinmove.destroy();
        }
        for (var _iterator2 = _createForOfIteratorHelperLoose(arrayXuiNode), _step2; !(_step2 = _iterator2()).done; ) {
          var _coinmove = _step2.value;
          _coinmove.destroy();
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  start: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b8d77FjlVACYXZo2WK+PRY", "start");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {},
      loadUI: function loadUI() {
        cc.director.loadScene("GameScence");
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "CryptoJS", "SoundMN", "audio-manager", "coinAction", "coinStyle", "coinSwitch", "coinSwitchlight", "game", "HotUpdateModule", "LoginView", "normalCoin", "resultCubBet", "shakeCub", "start" ]);