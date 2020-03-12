(function(k, ma, Ka, ka, z) {
  function Ca(c, e, g) {
    $.ajax({
      url: "/ajax_get_img_data",
      data: {url: c},
      success: function(c) {
        c.error ? (loading(!1), error_dialog(c.error)) : e(c.img_data, g);
      }
    });
  }
  function Y(c, e, g, k, B) {
    function F() {
      w.hide();
      $(ma).off("click", F);
      if (Y && e !== Y)
        a: {
          for (var c = e, Z = c.toUpperCase(), k = 0; k < g.length; k++)
            if (g[k].toUpperCase() === Z) break a;
          if (La()) {
            Z = (Z = localStorage.getItem("colors_used")) ? JSON.parse(Z) : {};
            Z[c] = Z[c] || {name: c};
            Z[c].last_used = Date.now();
            Z = JSON.stringify(Z);
            try {
              localStorage.setItem("colors_used", Z);
            } catch (t) {}
          }
        }
    }
    function P(c) {
      c = C(c, 1, 1);
      w.find(".color-slider-2d-wrap").css(
        "background",
        "rgb(" + c.r + "," + c.g + "," + c.b + ")"
      );
    }
    function fa(c, e, g) {
      c = C(c, e, g);
      return (
        "#" +
        (16 > c.r ? "0" : "") +
        c.r.toString(16) +
        (16 > c.g ? "0" : "") +
        c.g.toString(16) +
        (16 > c.b ? "0" : "") +
        c.b.toString(16)
      );
    }
    function C(c, e, g) {
      var k,
        t,
        w,
        B = Math.floor(6 * c),
        C = 6 * c - B;
      c = g * (1 - e);
      var F = g * (1 - C * e);
      e = g * (1 - (1 - C) * e);
      switch (B % 6) {
        case 0:
          k = g;
          t = e;
          w = c;
          break;
        case 1:
          k = F;
          t = g;
          w = c;
          break;
        case 2:
          k = c;
          t = g;
          w = e;
          break;
        case 3:
          k = c;
          t = F;
          w = g;
          break;
        case 4:
          k = e;
          t = c;
          w = g;
          break;
        case 5:
          (k = g), (t = c), (w = F);
      }
      return {
        r: Math.round(255 * k),
        g: Math.round(255 * t),
        b: Math.round(255 * w)
      };
    }
    function Q() {
      if (!La()) return [];
      var c = localStorage.getItem("colors_used"),
        c = c ? JSON.parse(c) : {},
        e = [],
        k;
      for (k in c)
        c.hasOwnProperty(k) &&
          2592e6 > Date.now() - c[k].last_used &&
          e.push(k);
      e.sort(function(e, g) {
        return c[g].last_used - c[e].last_used;
      });
      return e.slice(0, 20 - g.length);
    }
    function aa() {
      for (var c = "", e = 0; e < g.length; e++)
        c +=
          '<div class="color-box" data-color="' +
          g[e] +
          '" style="background:' +
          g[e] +
          '"></div>';
      for (var k = Q(), e = 0; e < k.length; e++)
        c +=
          '<div class="color-box" data-color="' +
          esc(k[e]) +
          '" style="background:' +
          esc(k[e]) +
          '"></div>';
      return c;
    }
    function S() {
      w ||
        ((w = $(
          '<div class="color-popup"><div class="color-panel"><div class="color-boxes">' +
            aa() +
            '</div><input class="color-input" type="text" maxlength="9" tabindex="-1" value="' +
            e +
            '"/></div><div class="color-slider-2d-wrap"><div class="color-slider-2d"></div><div class="color-bg1"></div><div class="color-bg2"></div></div><div class="color-slider-wrap"><div class="color-slider"></div></div></div>'
        )),
        (R = w.find(".color-input")),
        R.change(function() {
          var c = R.val();
          ua(c);
          F();
        }),
        w.on("click", ".color-box", function() {
          var c = $(this).data("color");
          ua(c);
          F();
        }),
        w.click(cancelEvent),
        c.append(w),
        Na(
          w.find(".color-slider-2d-wrap"),
          w.find(".color-slider-2d"),
          function(c, e) {
            va = c;
            N = 1 - e;
            ua(fa(wa, va, N));
          }
        ),
        Na(w.find(".color-slider-wrap"), w.find(".color-slider"), function(
          c,
          e
        ) {
          wa = e;
          P(wa);
          ua(fa(wa, va, N));
        }),
        P(0));
    }
    var w,
      R,
      z,
      wa = 0,
      va = 1,
      N = 1,
      Y;
    this.getColor = function() {
      return e;
    };
    var ua = (this.setColor = function(c) {
      e = c;
      R && R.val(c);
      z.css("background", c);
      k(c);
    });
    z = $(
      '<div class="color-btn" style="background:' +
        e +
        '" title="' +
        (B || "") +
        '"></div>'
    );
    c.addClass("color-picker")
      .append(z)
      .data("picker", this)
      .click(function(g) {
        cancelEvent(g);
        S();
        if ("none" === w.css("display")) {
          w.find(".color-boxes").html(aa());
          g = w.width();
          var k = c.offset(),
            t = k.left + c.width(),
            B = Ka.width() - k.left,
            k = B > t ? "left" : "right",
            t = Math.max(t, B),
            B = 0;
          t < g + 10 && (B = -(g - t) - 10);
          w.css(k, B);
          w.show();
          ka.click(F);
          Y = e;
        } else F();
      });
  }
  function Na(c, e, g) {
    function k() {
      ka.off("vmouseup", k).off("vmousemove", B);
    }
    function B(c) {
      F(S + (c.pageX - R), w + (c.pageY - N));
      g && g(Q / P, aa / z);
      c.preventDefault();
    }
    function F(c, g) {
      Q = 0 > c ? 0 : c > P - 1 ? P : c;
      aa = 0 > g ? 0 : g > z - 1 ? z : g;
      e.css({left: Q, top: aa});
    }
    var P = c.width(),
      z = c.height(),
      C = e.offset(),
      Q = C.left,
      aa = C.top,
      S,
      w,
      R,
      N;
    c.on("vmousedown", function(e) {
      R = e.pageX;
      N = e.pageY;
      var C = c.offset();
      F(R - C.left, N - C.top);
      S = Q;
      w = aa;
      g && g(Q / P, aa / z);
      ka.on("vmouseup", k).on("vmousemove", B);
      e.preventDefault();
    });
  }
  function La() {
    var c;
    try {
      return (
        (c = k.localStorage),
        c.setItem("__test__", "__test__"),
        c.removeItem("__test__"),
        !0
      );
    } catch (e) {
      return !1;
    }
  }
  function oa(c, e, g, k, B) {
    e = e ? 1 : "";
    k = k || "canvas";
    var F = $(".gen-anon").prop("checked") && !e ? 1 : "",
      z = $(".gen-private").prop("checked") && !e ? 1 : "";
    mm.currentMeme();
    var fa = mm.ctx(),
      C = mm.canv(),
      Q = mm.getText();
    signCanvas(fa, C.width, C.height, 67600, !0, null, B);
    B = C.toDataURL("image/jpeg");
    g && Ea(B, !0);
    g = mm.memeData();
    for (C = 0; C < g.boxes.length; C++)
      if (
        ((fa = g.boxes[C]),
        "image" === fa.type &&
          0.5 < fa.w / mm.canvasWidth() &&
          0.5 < fa.h / mm.canvasHeight())
      ) {
        g.template = 0;
        break;
      }
    $.extend(g, {
      imgData: B.substr(B.search(",") + 1),
      text: Q,
      type: "jpeg",
      anon: F,
      private: z,
      isReply: e,
      source: k
    });
    $.ajax({
      url: "/ajax_meme_done_canvas",
      type: "post",
      data: g,
      dataType: "json",
      success: function(e) {
        e.error ? (loading(!1), error_dialog(e.error), N && N.hide()) : c(e, z);
      },
      error: function() {
        handleRequestError();
        N && N.hide();
      }
    });
  }
  function $a(c, e) {
    Oa(
      c,
      e,
      "meme",
      function() {
        mm.reset();
        N.hide();
        Fa();
      },
      mm.currentMeme().name || "Untitled"
    );
  }
  function Fa() {
    var c = $(".head");
    c.find(".ad")[0] &&
      k.deployads &&
      (deployads.push(function() {
        deployads.gpt.pubadsRefresh();
      }),
      (c = c.position().top),
      $w.scrollTop() > c && k.scrollTo(0, c));
  }
  function Ea(c, e) {
    k.scrollTo(0, 0);
    N = k.imgDoneBox = new Box({
      html:
        '<div id="done"><img id="done-img"' +
        (c ? ' src="' + c + '"' : "") +
        '/><div id="done-info"></div><div id="done-msgs"></div><div id="done-share"></div><div id="done-embed-codes">' +
        (e ? '<div class="load load-dark"></div>' : "") +
        '</div><div id="done-btns"></div></div>',
      bg: "transparent",
      top: 20,
      hideX: !0,
      noMaskClick: !0
    });
  }
  function Oa(c, e, g, k, B, z, P, fa) {
    _gaq.push("_trackPageview");
    var C = {meme: "jpg", gif: "gif", pie: "png", demotivational: "jpg"}[g],
      Q = parseInt(c.iid).toString(36),
      aa = ("gif" === C ? "/gif/" : "/i/") + Q,
      S = !0,
      w = $("#done-img"),
      R = $("#done-embed-codes");
    if (!w.attr("src"))
      w.attr("src", (e ? "//i2.imgflip.com/" : IMAGE_DOMAIN) + Q + "." + C);
    else if (!e) {
      var Y = new Image();
      $(Y).load(function() {
        w.attr("src", $(this).attr("src"));
      });
      Y.src = IMAGE_DOMAIN + Q + "." + C;
    }
    ka.on("contextmenu", "#done-img", function() {
      S = !1;
    });
    R.html(embedCodes(Q, C, e, !e && "gif" !== g, g, c.has_gif_video, P, fa))
      .find(".img-code")
      .click(function() {
        $(this).select();
        S = !1;
      })
      .on("focus", function() {
        S = !1;
      });
    e || I.user.id
      ? e ||
        ((g = '<div class="done-msg">'),
        (g = (P = GET().stream)
          ? g +
            ('<div id="done-submit" class="b but">Post image to ' +
              esc(P) +
              " stream</div>")
          : g +
            '<span id="done-submit" class="a">Submit this image to the Imgflip community</span></div>'),
        R.after(g + "</div>"),
        $("#done-submit").click(function() {
          S = !1;
          submitImg(c.iid);
        }))
      : ((g =
          '<div class="done-msg">You are not logged in! If you want to claim or delete this image, '),
        (g +=
          '<a class="done-link" target="_blank" href="/login?claim_iid=' +
          c.iid +
          '">Login and claim it</a>'),
        (g +=
          ' or <a class="done-link" target="_blank" href="/signup?claim_iid=' +
          c.iid +
          '">Signup and claim it</a>'),
        (g += "</div>"),
        R.after(g));
    R = $('<div class="l but">&larr; Change settings</div>').click(function() {
      S &&
        $.ajax({
          url: "/ajax_delete_creation",
          type: "post",
          data: {iid: c.iid}
        });
      N.hide();
      Fa();
      z && z();
    });
    k = $('<div class="l but">Make another</div>').click(k);
    g = $("#done-btns");
    g.html(R);
    e
      ? $("#done-msgs").append(
          '<div class="done-msg">This image is private. It will only be stored on imgflip servers long enough for you to download it.</div>'
        )
      : ((e = $("<a class='l but' href='" + aa + "'>Go to image page</a>")),
        e.click(function() {
          S = !1;
        }),
        g.append(e),
        $("#done-share")
          .html(getShareButtonsHtml(Q, C, B))
          .on("click", ".shr-btn,.shr-btn-device", function() {
            S = !1;
          }));
    g.append(k);
  }
  var kb = k.File && k.FileReader && k.FileList,
    N;
  MemeMaker = function(c, e, g, t) {
    function B(a) {
      F(a);
      for (a = 0; a < h.length; a++) h[a].autoResize(v().w, v().h, !1);
    }
    function F(a) {
      a > O && (a = O);
      var b = (v().h / v().w) * a;
      Pa && b > Pa && (a *= Pa / b);
      ab = ba || a;
      ba = a;
      u = ba / v().w;
      ga.width(ba);
    }
    function P(a) {
      return a.effect_img
        ? a.effect_img.src
        : 0 === a.id
        ? a.img
          ? a.img.src
          : ""
        : a.url_name
        ? "/s/meme/" + a.url_name + "." + a.file_type
        : "https:" +
          IMAGE_DOMAIN +
          (+a.id).toString(36) +
          "." +
          a.file_type +
          "?a" +
          Math.round(+new Date() / 1e3 / 3600) +
          ("imgflip.com" !== k.location.hostname ? "&j" : "");
    }
    function N(a, b) {
      if (lb) return a;
      500 > a && ((b *= 500 / a), (a = 500));
      if (25e4 > a * b) {
        var x = b / a;
        a = Math.sqrt(25e4 / x);
        b = x * a;
      }
      return Math.min(a, Math.max(500, (a / b) * 500));
    }
    function C() {
      var a = G.find(".mm-effect").val();
      c[V].effect_img = null;
      if (a) {
        var b = P(v()),
          x = new Image();
        "http" === b.substr(0, 4) && x.setAttribute("crossorigin", "anonymous");
        $(x).load(function() {
          var b = ma.createElement("canvas"),
            L = b.getContext("2d");
          b.width = O;
          b.height = ea;
          L.drawImage(x, 0, 0, x.width, x.height, 0, 0, O, ea);
          var n = L.getImageData(0, 0, O, ea),
            q = +new Date(),
            f = function(f) {
              console.log("Effect took " + (+new Date() - q) + "ms");
              L.putImageData(f, 0, 0);
              var x = new Image();
              $(x).load(function() {
                c[V].effect = a;
                c[V].effect_img = x;
                l.select(V, !1);
              });
              x.src = b.toDataURL("image/png");
            };
          "smart_posterize" === a
            ? ((n = aa(L, n)), f(n))
            : "meme_border" === a
            ? Q(L, n, f)
            : "jpeg_degrade" === a
            ? ka(b, f, 32)
            : "jpeg_min_quality" === a
            ? ka(b, f, 1, 0.01)
            : "blur" === a
            ? ((n = R(L, n, 5)), f(n))
            : "sharpen" === a
            ? ((n = w(L, n, 3, 2)), f(n))
            : "median_filter" === a
            ? ((n = S(L, n, 5)), f(n))
            : "median_filter_sharpen" === a &&
              ((n = S(L, n, 5)), (n = w(L, n, 5, 3)), f(n));
        });
        x.src = b;
      } else (c[V].effect = a), l.select(V, !1);
    }
    function Q(a, b, x) {
      a = function() {
        var a = ma.createElement("canvas"),
          c = a.getContext("2d");
        a.width = b.width;
        a.height = (pa.height / pa.width) * a.width;
        var n = Math.floor(a.width / 20);
        c.drawImage(pa, 0, 0, a.width, a.height);
        for (
          var q = c.getImageData(0, 0, a.width, a.height).data,
            c = c.createImageData(b),
            f = b.width,
            m = b.height,
            ha = b.data,
            h = 0;
          h < m;
          h++
        )
          for (var e = 0; e < f; e++) {
            var g = h * f * 4 + 4 * e,
              r = ha[g],
              k = ha[g + 1],
              M = ha[g + 2],
              J = ha[g + 3];
            if (e < n || e >= f - n || h < n || h > m - n) {
              r = e;
              k = h;
              for (h >= m - n && (k = n + n - m + h); k >= a.height; )
                (k -= a.height - n), (r += e > f / 2 ? -n : n);
              J = k * a.width * 4 + 4 * r;
              r = q[J];
              k = q[J + 1];
              M = q[J + 2];
              J = q[J + 3];
            }
            c.data[g] = r;
            c.data[g + 1] = k;
            c.data[g + 2] = M;
            c.data[g + 3] = J;
          }
        x(c);
      };
      pa
        ? a()
        : ((pa = new Image()), $(pa).load(a), (pa.src = "/meme_collage.jpg"));
    }
    function aa(a, b) {
      b = w(a, b, 1, 2);
      for (
        var x = a.createImageData(b),
          d = b.width,
          c = b.height,
          n = b.data,
          q = Array(d * c),
          f = 0,
          m = [],
          ha = 0;
        ha < c;
        ha++
      )
        for (var h = 0; h < d; h++) {
          var e = ha * d + h;
          if (!q[e]) {
            q[e] = !0;
            f++;
            for (
              var g = n[4 * e],
                r = n[4 * e + 1],
                k = n[4 * e + 2],
                M = n[4 * e + 3],
                J = [e],
                p = [e];
              p.length;

            )
              for (
                var y = p.pop(), e = [y - 1, y + 1, y - d, y + d], U = 0;
                U < e.length;
                U++
              ) {
                var l = e[U];
                if (!(q[l] || 0 > l || l >= d * c)) {
                  var t = n[4 * l],
                    B = n[4 * l + 1],
                    v = n[4 * l + 2],
                    y = n[4 * l + 3];
                  25 > Math.abs(t - g) &&
                    25 > Math.abs(B - r) &&
                    25 > Math.abs(v - k) &&
                    25 > Math.abs(y - M) &&
                    (J.push(l),
                    p.unshift(l),
                    (q[l] = !0),
                    f++,
                    (g += (t - g) / J.length),
                    (r += (B - r) / J.length),
                    (k += (v - k) / J.length),
                    (M += (y - M) / J.length));
                }
              }
            g = Math.round(g);
            r = Math.round(r);
            k = Math.round(k);
            M = Math.round(M);
            50 > J.length && m.push([J, g, r, k, M]);
            for (U = 0; U < J.length; U++)
              (y = J[U]),
                (x.data[4 * y] = g),
                (x.data[4 * y + 1] = r),
                (x.data[4 * y + 2] = k),
                (x.data[4 * y + 3] = M);
          }
        }
      for (U = 0; U < m.length; U++) {
        J = m[U][0];
        n = m[U][1];
        q = m[U][2];
        f = m[U][3];
        ha = m[U][4];
        e = [];
        for (h = 0; h < J.length; h++)
          (y = J[h]), e.push(y - 1, y + 1, y - d, y + d);
        for (var g = Infinity, Ga, h = 0; h < e.length; h++)
          (y = e[h]),
            0 > y ||
              y >= d * c ||
              ((t = x.data[4 * y]),
              (B = x.data[4 * y + 1]),
              (v = x.data[4 * y + 2]),
              (y = x.data[4 * y + 3]),
              (r =
                Math.abs(t - n) +
                Math.abs(B - q) +
                Math.abs(v - f) +
                Math.abs(y - ha)),
              0 < r && r < g && ((g = r), (Ga = [t, B, v, y])));
        for (h = 0; h < J.length; h++)
          (y = J[h]),
            (x.data[4 * y] = Ga[0]),
            (x.data[4 * y + 1] = Ga[1]),
            (x.data[4 * y + 2] = Ga[2]),
            (x.data[4 * y + 3] = Ga[3]);
      }
      return (x = S(a, x, 2));
    }
    function S(a, b, c) {
      a = a.createImageData(b);
      var d = b.width,
        h = b.height;
      b = b.data;
      for (var n = 0; n < d; n++)
        for (var q = 0; q < h; q++) {
          for (
            var f = Array(Math.ceil(102.4)), m = 0, e = n - c;
            e <= n + c;
            e++
          )
            for (var g = q - c; g <= q + c; g++)
              if (0 <= e && e < d && 0 <= g && g < h) {
                var k = [
                    b[g * d * 4 + 4 * e],
                    b[g * d * 4 + 4 * e + 1],
                    b[g * d * 4 + 4 * e + 2],
                    b[g * d * 4 + 4 * e + 3]
                  ],
                  l = Math.round((k[0] + k[1] + k[2] + k[3]) / 10);
                f[l] = f[l] || [];
                f[l].push(k);
                m++;
              }
          var k = 0,
            r,
            m = Math.floor(m / 2),
            e = 0;
          a: for (; e < f.length; e++)
            if (f[e])
              for (g = 0; g < f[e].length; g++)
                if ((k++, k >= m)) {
                  r = f[e][g];
                  break a;
                }
          a.data[q * d * 4 + 4 * n] = r[0];
          a.data[q * d * 4 + 4 * n + 1] = r[1];
          a.data[q * d * 4 + 4 * n + 2] = r[2];
          a.data[q * d * 4 + 4 * n + 3] = r[3];
        }
      return a;
    }
    function w(a, b, c, d) {
      a = a.createImageData(b);
      var e = b.width,
        n = b.height;
      b = b.data;
      for (var q = 0; q < e; q++)
        for (var f = 0; f < n; f++) {
          for (
            var m = b[f * e * 4 + 4 * q],
              h = b[f * e * 4 + 4 * q + 1],
              g = b[f * e * 4 + 4 * q + 2],
              k = b[f * e * 4 + 4 * q + 3],
              l = 0,
              r = 0,
              p = 0,
              M = 0,
              J = 0,
              t = q - c;
            t <= q + c;
            t++
          )
            for (var y = f - c; y <= f + c; y++)
              0 <= t &&
                t < e &&
                0 <= y &&
                y < n &&
                (t !== q || y !== f) &&
                ((l += b[y * e * 4 + 4 * t] - m),
                (r += b[y * e * 4 + 4 * t + 1] - h),
                (p += b[y * e * 4 + 4 * t + 2] - g),
                (M += b[y * e * 4 + 4 * t + 3] - k),
                J++);
          a.data[f * e * 4 + 4 * q] = Math.min(
            255,
            Math.max(0, m - Math.round((l / J) * d))
          );
          a.data[f * e * 4 + 4 * q + 1] = Math.min(
            255,
            Math.max(0, h - Math.round((r / J) * d))
          );
          a.data[f * e * 4 + 4 * q + 2] = Math.min(
            255,
            Math.max(0, g - Math.round((p / J) * d))
          );
          a.data[f * e * 4 + 4 * q + 3] = Math.min(
            255,
            Math.max(0, k - Math.round((M / J) * d))
          );
        }
      return a;
    }
    function R(a, b, c) {
      a = a.createImageData(b);
      var d = b.width,
        e = b.height;
      b = b.data;
      for (var n = 0; n < d; n++)
        for (var q = 0; q < e; q++) {
          for (
            var f = 0, m = 0, h = 0, g = 0, k = 0, l = n - c;
            l <= n + c;
            l++
          )
            for (var r = q - c; r <= q + c; r++)
              0 <= l &&
                l < d &&
                0 <= r &&
                r < e &&
                ((f += b[r * d * 4 + 4 * l]),
                (m += b[r * d * 4 + 4 * l + 1]),
                (h += b[r * d * 4 + 4 * l + 2]),
                (g += b[r * d * 4 + 4 * l + 3]),
                k++);
          a.data[q * d * 4 + 4 * n] = Math.round(f / k);
          a.data[q * d * 4 + 4 * n + 1] = Math.round(m / k);
          a.data[q * d * 4 + 4 * n + 2] = Math.round(h / k);
          a.data[q * d * 4 + 4 * n + 3] = Math.round(g / k);
        }
      return a;
    }
    function ka(a, b, c, d) {
      var e = a.width,
        n = a.height,
        q = ma.createElement("canvas");
      q.width = e;
      q.height = n;
      var f = q.getContext("2d");
      f.drawImage(a, 0, 0);
      var m = function() {
        var a = d !== z ? d : 0.5 + 0.3 * Math.random(),
          a = q.toDataURL("image/jpeg", a),
          h = new Image();
        $(h).load(function() {
          f.drawImage(h, 0, 0);
          c--;
          0 < c ? m() : b(f.getImageData(0, 0, e, n));
        });
        h.src = a;
      };
      m();
    }
    function wa() {
      K = W.find(".mm-spacing-type").val();
      Qa = W.find(".mm-spacing-color").val();
      xa = W.find(".mm-spacing-size").val();
      var a = W.find(".mm-spacing-settings"),
        b = c.spaced ? c.spaced.w : v().w,
        x = c.spaced ? c.spaced.h : v().h;
      if (K) {
        a.show();
        T = T !== z ? T : V;
        var d = c[T],
          e = P(d),
          n = new Image();
        "http" === e.substr(0, 4) && n.setAttribute("crossorigin", "anonymous");
        $(n).load(function() {
          var e = ma.createElement("canvas"),
            f = e.getContext("2d"),
            m = n.width,
            h = n.height,
            g = Math.round((xa / 100) * h);
          e.width = m;
          e.height = h + g * ("top_bottom" === K ? 2 : 1);
          var k = "white" === Qa ? "#fff" : "#000";
          if ("auto" === Qa) {
            var L;
            f.drawImage(n, 0, 0, m, g, 0, 0, m, g);
            k = va(f.getImageData(0, 0, m, g));
            f.drawImage(n, 0, h - g, m, g, 0, 0, m, g);
            var r = va(f.getImageData(0, 0, m, g));
            if ("top" === K) L = k;
            else if ("bottom" === K) L = r;
            else if ("top_bottom" === K) {
              L = [];
              for (var p = 0; 4 > p; p++) L[p] = Math.round((k[p] + r[p]) / 2);
            }
            k = "rgba(" + L[0] + "," + L[1] + "," + L[2] + "," + L[3] + ")";
          }
          L = 0;
          if ("top" === K || "top_bottom" === K)
            (L += g), (f.fillStyle = k), f.fillRect(0, 0, m, g);
          f.drawImage(n, 0, L);
          if ("bottom" === K || "top_bottom" === K)
            (f.fillStyle = k), f.fillRect(0, L + h, m, g);
          var M = new Image();
          $(M).load(function() {
            var f = 0;
            c.spaced &&
              "bottom" !== c.spaced.spacing_type &&
              (f -= c.spaced.spacing_height);
            "bottom" !== K && (f += g);
            oa(f, M.height, d.h, b, x);
            c.spaced = {
              id: 0,
              templates: d.templates || [{id: d.id, url: d.template_url}],
              name: "Spaced Image",
              spacing_type: K,
              spacing_height: g,
              img: M,
              w: M.width,
              h: M.height
            };
            l.select("spaced", !1);
            a.find(".mm-toggle-drag").prop("checked") || Ha(!0);
          });
          M.src = e.toDataURL("image/png");
        });
        n.src = e;
      } else
        T !== z &&
          ("top" === c.spaced.spacing_type ||
          "top_bottom" === c.spaced.spacing_type
            ? oa(-c.spaced.spacing_height, c[T].h, c[T].h, b, x)
            : oa(0, c[T].h, c[T].h, b, x),
          l.select(T, !1),
          (T = z)),
          delete c.spaced,
          a.hide();
    }
    function va(a) {
      for (var b = a.data, c = 0, d = 0, e = 0, h = 0, q = 0; 100 > q; q++)
        var f = (Math.random() * a.width) >> 0,
          m = (Math.random() * a.height) >> 0,
          c = c + b[m * a.width * 4 + 4 * f],
          d = d + b[m * a.width * 4 + 4 * f + 1],
          e = e + b[m * a.width * 4 + 4 * f + 2],
          h = h + b[m * a.width * 4 + 4 * f + 3];
      return [
        Math.round(c / 100),
        Math.round(d / 100),
        Math.round(e / 100),
        Math.round(h / 100)
      ];
    }
    function oa(a, b, c, d, e) {
      for (var n = !1, q = !1, f = 0; f < h.length; f++) {
        var m = h[f].getVals();
        !n &&
        ("top" === K || "top_bottom" === K) &&
        m.w > 0.8 * d &&
        m.y < 0.1 * e
          ? ((m.x = 5),
            (m.y = 5),
            (m.w = d - 10),
            (m.h = (xa / 100) * c - 10),
            (n = !0))
          : !q &&
            ("bottom" === K || "top_bottom" === K) &&
            m.w > 0.8 * d &&
            m.y + m.h > 0.9 * e
          ? ((m.x = 5),
            (m.y = b - (xa / 100) * c + 5),
            (m.w = d - 10),
            (m.h = (xa / 100) * c - 5 - 13),
            (q = !0))
          : ((m.y += a),
            5 > m.y && (m.y = 5),
            m.y + m.h > b - 13 && (m.y = b - m.h - 13));
        h[f].setVals(m.x, m.y, m.w, m.h, m.rotation);
      }
    }
    function Ja() {
      K &&
        W.find(".mm-spacing-type")
          .val("")
          .change();
      var a = v(),
        b = a.w;
      a.w = a.h;
      a.h = b;
      a.rotation = 270 === a.rotation ? 0 : ~~a.rotation + 90;
      l.select(V);
    }
    function ua() {
      mb = new Box({
        html:
          '<div id="mm-upload"><div id="mm-upload-file-btn" class="l but">Upload image from your device<input id="mm-upload-file" type="file" class="hidden-file-input"/></div><div id="mm-upload-or">OR</div><input id="mm-upload-url" type="url" placeholder="Paste image or image URL"/><div id="mm-upload-btns"><div class="mm-upload-rotate l but sml">' +
          ROTATE_SVG +
          '</div><div class="mm-upload-flip l but sml">flip</div></div><div id="mm-upload-img-preview-wrap"></div><div id="mm-upload-warning" class="msg msg-orange"></div><div id="mm-upload-public-wrap"><label><input id="mm-upload-public" type="checkbox"/> Allow this template to be shared publicly</label></div><div id="mm-upload-public-settings">Name <input id="mm-upload-name" type="text" maxlength="64" placeholder="e.g. X All the Y"/>Alternate Names (comma-separated) <input id="mm-upload-alt-names" type="text" maxlength="255" placeholder="e.g. All the Things"/>Description <textarea id="mm-upload-description" maxlength="512" placeholder="e.g. history of the meme and how it should be used"></textarea></div><div id="mm-upload-btn" class="l but">Upload</div></div>',
        w: 360
      });
      var a = $("#mm-upload-img-preview-wrap");
      $("#mm-upload-public").click(function() {
        $("#mm-upload-public-settings").toggle($(this).prop("checked"));
      });
      $("#mm-upload-btn").on("click", function() {
        var a = !$("#mm-upload-public").prop("checked");
        ca
          ? a
            ? ca
              ? kb || "upload" !== bb
                ? (loading("Uploading image"),
                  Z(ca.getFinalDataUrl("image/png"), Ra))
                : alert(
                    "To use a fully private template, your browser needs to support the HTML5 File API. All modern browsers support the File API. If you cannot upgrade your browser right away, you can still create your meme if you set the template as public."
                  )
              : MSG("No image selected", "red")
            : (loading("Uploading new template"),
              $.ajax({
                url: "/ajax_upload_template",
                type: "post",
                dataType: "json",
                data: {
                  img_data: ca.getFinalDataUrl("image/png"),
                  template_url: Ra,
                  template_name: $("#mm-upload-name").val(),
                  template_alt_names: $("#mm-upload-alt-names").val(),
                  template_description: $("#mm-upload-description").val()
                },
                success: function(a) {
                  a.error
                    ? (loading(!1), error_dialog(a.error))
                    : (k.location = a.url);
                }
              }))
          : MSG("No file or URL selected", "red");
      });
      $("#mm-upload-file").change(function() {
        Ba("upload", a, $(this)[0].files[0]);
      });
      $("#mm-upload-url").on("keyup change paste", function(b) {
        var c = (b.originalEvent || b).clipboardData;
        if (c && c.items)
          for (var c = c.items, d = 0; d < c.length; d++)
            if (0 === c[d].type.indexOf("image"))
              return Ba("paste", a, c[d].getAsFile()), cancelEvent(b);
        Fb($(this), a);
      });
    }
    function Ba(a, b, c) {
      if (0 !== c.type.indexOf("image")) MSG("File is not an image", "red");
      else {
        b.show();
        var d = new FileReader();
        d.onload = function(d) {
          ca = new ImageCropper(b, b.width(), b.width());
          ca.setSrc(d.target.result, c.name);
          $("#mm-upload-btns").show();
          bb = a;
          Ra = ("paste" === a ? "paste:" : "") + c.name;
        };
        d.readAsDataURL(c);
      }
    }
    function Z(a, b) {
      var e = new Image();
      $(e).load(function(a) {
        c.custom = {
          id: 0,
          name: "Custom Image",
          img: e,
          w: e.width,
          h: e.height,
          template_url: b || ""
        };
        l.select("custom");
        loading(!1);
      });
      e.src = a;
      mb.hide();
    }
    function Ca(a) {
      if (Sa[a] !== z) return Sa[a];
      var b;
      b = "abcdefghijklmnopqrstuvwxyz0123456789\u4f60\u3053";
      b += "\u0645";
      b += "\u0c4b";
      b += "\u0bb5";
      ya ||
        ((ya = $("<canvas/>")[0].getContext("2d")),
        (ya.font = "72px monospace"),
        (nb = ya.measureText(b).width));
      ya.font = "72px '" + a + "', monospace";
      b = ya.measureText(b).width !== nb;
      return (Sa[a] = b);
    }
    function Na(a) {
      var b = '<div class="mm-font-selector">',
        c = Oa();
      if (c.length)
        for (
          var b = b + '<div class="mm-font-section-label">Recent Fonts</div>',
            d = 0;
          d < c.length;
          d++
        )
          b += Ma(c[d]);
      b += '<div class="mm-font-section-label">Web Fonts</div>';
      for (d = 0; d < Ta.length; d++) b += Ma(Ta[d]);
      var b =
          Sa[cb[0]] !== z
            ? b + Ea()
            : b + '<div class="mm-font-show-more l but">Show More Fonts</div>',
        e = new Box({html: b}),
        h = e.el().find(".mm-font-selector");
      h.on("click", ".mm-font-item", function() {
        var b = $(this).data("font");
        e.hide();
        a && a(b);
        a: {
          for (var d = b.toUpperCase(), c = 0; c < Ta.length; c++)
            if (Ta[c].toUpperCase() === d) break a;
          if (La()) {
            d = (d = localStorage.getItem("fonts_used")) ? JSON.parse(d) : {};
            d[b] = d[b] || {name: b};
            d[b].last_used = Date.now();
            d = JSON.stringify(d);
            try {
              localStorage.setItem("fonts_used", d);
            } catch (h) {}
          }
        }
      });
      h.on("click", ".mm-font-show-more", function() {
        h.append(Ea());
        $(this).remove();
      });
      h.on("click", ".mm-font-add-btn", function() {
        var a = h.find(".mm-font-add-input"),
          b = a.val();
        if (b) {
          for (var d = db.concat(cb).concat(ob), c = 0; c < d.length; c++)
            if (b.toLowerCase() === d[c].toLowerCase()) {
              error_dialog("This font is already in the list below!");
              return;
            }
          Ca(b)
            ? (db.push(b), $(this).after(Ma(b)), a.val(""))
            : error_dialog(
                "This font was not detected on your device. Try checking the spelling and ensuring the font is installed on your device."
              );
        }
      });
    }
    function Ma(a) {
      var b = esc(a);
      return (
        '<div class="mm-font-item" title="' +
        b +
        '" data-font="' +
        b +
        '" style="font:16px ' +
        ("Impact" === a ? "impact,impac" : b) +
        '">' +
        b +
        "</div>"
      );
    }
    function Ea() {
      for (
        var a = db.concat(cb).concat(ob), b = {}, c = [], d = 0;
        d < a.length;
        d++
      ) {
        var e = a[d];
        b[e] || ((b[e] = !0), Ca(e) && c.push(e));
      }
      if (!c.length) return "";
      a =
        '<div class="mm-font-section-label">Other fonts on your device</div><div class="mm-font-add-label">Not seeing a font you have? Add it:</div><input class="mm-font-add-input" type="text"/>';
      a += '<div class="mm-font-add-btn l but">Add</div>';
      for (d = 0; d < c.length; d++) a += Ma(c[d]);
      return (a += "</div>");
    }
    function Oa() {
      if (!La()) return [];
      var a = localStorage.getItem("fonts_used"),
        a = a ? JSON.parse(a) : {},
        b = [],
        c;
      for (c in a)
        a.hasOwnProperty(c) &&
          2592e6 > Date.now() - a[c].last_used &&
          b.push(c);
      b.sort(function(b, c) {
        return a[c].last_used - a[b].last_used;
      });
      return b;
    }
    function Da(a, b, c, d) {
      function e() {
        g.updateColors();
      }
      c = c || {};
      b =
        '<div class="mm-box-edit"><div class="mm-text-wrap"><textarea placeholder="' +
        esc(b) +
        '" class="mm-text"></textarea></div><div class="mm-font-options"><div class="color-picker mm-font-color-picker"></div>';
      b +=
        '<div class="color-picker mm-outline-color-picker"></div><div class="mm-font-options-btn-wrap">';
      b +=
        '<div class="l but mm-font-options-btn" title="Font settings"><svg class="gear-icon" viewBox="0 0 22 22"><path d="M18.92 9.63a.33.33 0 0 0-.22-.13l-1.9-.3c-.1-.32-.25-.67-.43-1.01.12-.18.31-.42.56-.74.25-.31.43-.54.53-.69a.4.4 0 0 0 .09-.24c0-.1-.03-.17-.08-.23-.25-.35-.82-.94-1.72-1.77a.4.4 0 0 0-.26-.1c-.1 0-.18.03-.25.09l-1.48 1.11c-.28-.14-.6-.27-.93-.38l-.3-1.92a.3.3 0 0 0-.11-.22.4.4 0 0 0-.26-.09H9.85c-.2 0-.33.1-.38.3-.09.34-.19.98-.3 1.93-.33.1-.64.23-.95.4L6.78 4.51a.44.44 0 0 0-.27-.1c-.15 0-.48.24-.98.74s-.85.87-1.03 1.12a.44.44 0 0 0-.1.24c0 .08.04.17.11.25.47.56.84 1.04 1.12 1.44-.18.32-.31.64-.4.96l-1.95.29a.31.31 0 0 0-.2.13.4.4 0 0 0-.08.24v2.32c0 .09.03.17.09.24.05.07.12.12.22.13l1.9.28c.1.34.24.69.43 1.03l-.56.74c-.25.31-.43.54-.53.69a.4.4 0 0 0-.02.48c.28.37.85.96 1.72 1.75.08.08.17.11.26.11.1 0 .2-.03.26-.09l1.47-1.12c.29.15.6.28.94.4l.3 1.9c0 .1.04.17.11.23a.4.4 0 0 0 .26.09h2.31c.2 0 .33-.1.38-.3.09-.34.19-.98.3-1.93.32-.1.64-.23.95-.4l1.43 1.13c.1.06.2.1.27.1.16 0 .48-.25.98-.75.5-.49.85-.86 1.03-1.12.07-.07.1-.15.1-.24a.4.4 0 0 0-.1-.26c-.5-.61-.88-1.1-1.12-1.44.14-.26.27-.57.4-.95l1.93-.29a.32.32 0 0 0 .21-.13.4.4 0 0 0 .08-.24V9.87a.4.4 0 0 0-.08-.24m-6.03 3.27c-.52.52-1.15.78-1.89.78-.73 0-1.36-.26-1.88-.78A2.57 2.57 0 0 1 8.34 11c0-.74.26-1.36.78-1.89A2.57 2.57 0 0 1 11 8.34c.74 0 1.37.26 1.89.78.52.53.78 1.15.78 1.89s-.26 1.36-.78 1.89" fill="#4d4d4d"/></svg></div>';
      b += '<div class="mm-font-options-popup display-none">';
      b += '<div class="mm-font-opt">Font ';
      b +=
        '<div class="mm-font-btn l but sml down-arrow"><span class="mm-font-label">Impact</span></div>';
      b += '<input type="hidden" class="mm-font" name="font" value="impact"/>';
      b += "</div>";
      b +=
        '<div class="mm-font-opt mm-use-shadow-wrap"><label><input type="checkbox" class="mm-use-shadow" checked/><span class="checkbox-text"> Font shadow</span></label></div>';
      b +=
        '<div class="mm-font-opt"><label><input type="checkbox" class="mm-all-caps" checked/><span class="checkbox-text"> USE ALL CAPS</span></label></div>';
      b +=
        '<div class="mm-font-opt mm-font-bold-wrap"><label><input type="checkbox" class="mm-font-bold"/><span class="checkbox-text"> <b>Bold</b> (only works for some fonts)</span></label></div>';
      b +=
        '<div class="mm-font-opt mm-font-italic-wrap"><label><input type="checkbox" class="mm-font-italic"/><span class="checkbox-text"> <i>Italic</i> (only works for some fonts)</span></label></div>';
      b +=
        '<div class="mm-font-opt">Max Font Size <input class="mm-size" type="number" name="size" value="' +
        (c.maxFontSize || 50) +
        '" min="1" max="999"/> px</div>';
      b +=
        '<div class="mm-font-opt mm-font-ow-wrap">Shadow/Outline Width <input class="ow" type="number" maxlength="1" min="0" max="9"/></div>';
      b += '<div class="mm-font-opt">Text Align ';
      b += '<div class="select sml"><select class="mm-text-align">';
      b += '<option value="center">Center</option>';
      b += '<option value="left">Left</option>';
      b += '<option value="right">Right</option>';
      b += "</select></div>";
      b += "</div>";
      b += '<div class="mm-font-opt">Vertical Align ';
      b += '<div class="select sml"><select class="mm-vertical-align">';
      b += '<option value="middle">Middle</option>';
      b += '<option value="top">Top</option>';
      b += '<option value="bottom">Bottom</option>';
      b += "</select></div>";
      b += "</div>";
      b +=
        '<div class="mm-font-opt"><div class="l but sml mm-font-apply-to-all">Apply these settings to ALL text boxes</div></div>';
      b += "</div>";
      b += "</div>";
      b += "</div></div>";
      b = $(b);
      G.find(".mm-boxes").append(b);
      var g = new $a(b, a, c);
      h.push(g);
      d && g.autoResize(v().w, v().h, !0);
      var q = b.find(".mm-font-options-popup");
      q.click(stopProp);
      b.find(".mm-font-options-btn").click(function(a) {
        var b = q.hasClass("display-none");
        Fa();
        b && q.removeClass("display-none");
        stopProp(a);
      });
      new Y(b.find(".mm-font-color-picker"), na[1], na, e, "Change Font Color");
      new Y(
        b.find(".mm-outline-color-picker"),
        na[0],
        na,
        e,
        "Change Outline Color"
      );
      2 < h.length && Za(g.$box);
      Ua && Ua(b);
    }
    function Fa() {
      G.find(".mm-font-options-popup").addClass("display-none");
    }
    function Za(a) {
      a.css({background: "#fff"}).animate({opacity: 0}, 500, function() {
        $(this).css({background: "none", opacity: 1});
      });
    }
    function Va() {
      X.naturalWidth
        ? (p.save(),
          (p.fillStyle = Wa),
          p.fillRect(0, 0, A.width, A.height),
          p.restore(),
          0 < v().rotation
            ? (p.translate(A.width / 2, A.height / 2),
              p.rotate((v().rotation / 180) * Math.PI),
              180 === v().rotation
                ? (p.translate(-A.width / 2, -A.height / 2),
                  p.drawImage(X, 0, 0, A.width, A.height),
                  p.translate(A.width / 2, A.height / 2))
                : (p.translate(-A.height / 2, -A.width / 2),
                  p.drawImage(X, 0, 0, A.height, A.width),
                  p.translate(A.height / 2, A.width / 2)),
              p.rotate((-v().rotation / 180) * Math.PI),
              p.translate(-A.width / 2, -A.height / 2))
            : p.drawImage(X, 0, 0, A.width, A.height))
        : p.clearRect(0, 0, A.width, A.height);
      pb && pb(p, A);
      p.shadowBlur = 0;
      ia && p.drawImage(ia, 0, 0);
      for (var a = 0; a < h.length; a++)
        "image" !== h[a].type || h[a].hidden || h[a].draw();
      for (a = 0; a < h.length; a++)
        "text" !== h[a].type || h[a].hidden || h[a].draw();
    }
    function $a(a, b, c) {
      c = c || {};
      var d = this,
        e,
        g = a.find(".mm-all-caps").prop("checked"),
        q = a.find(".mm-use-shadow").prop("checked"),
        f = a.find(".mm-font-bold").prop("checked"),
        m = a.find(".mm-font-italic").prop("checked"),
        k = a.find(".mm-text-align").val();
      d.type = "text";
      d.size = c.maxFontSize || a.find(".mm-size").val() >> 0 || Gb;
      d.outline_width = q ? 5 : 1;
      d.text = "";
      d.font_color = "#ffffff";
      d.outline_color = "#000000";
      d.font = a.find(".mm-font").val() || "impact";
      d.$edit = a;
      var l = (d.$box = $("<div/>", {class: "drag-box off"})),
        t = new Dragger(
          l,
          ga,
          function() {
            D();
            Xa && Xa();
          },
          {enforceBoundary: !0, enableRotate: qb}
        ),
        B = a.find(".mm-text");
      l.hover(
        function() {
          clearTimeout(qa);
          $(".drag-box").removeClass("off");
        },
        function() {
          qa = setTimeout(function() {
            $(".drag-box").addClass("off");
          }, 10);
        }
      ).on("vmousedown", function() {
        $(".drag-box").removeClass("off");
      });
      a.find(".mm-font-btn").click(function() {
        Na(function(a) {
          v(a);
        });
      });
      a.find(".mm-all-caps").change(function() {
        g = $(this).prop("checked");
        r();
      });
      a.find(".mm-size")
        .change(function() {
          d.size = e = Math.max(1, $(this).val() >> 0);
          D();
        })
        .keyup(function() {
          d.size = e = Math.max(1, $(this).val() >> 0);
          D();
        });
      a.find(".mm-use-shadow").change(function() {
        q = !!$(this).prop("checked");
        a.find(".ow").val((d.outline_width = q ? 5 : 1));
        D();
      });
      a.find(".mm-font-bold").change(function() {
        f = $(this).prop("checked");
        D();
      });
      a.find(".mm-font-italic").change(function() {
        m = $(this).prop("checked");
        D();
      });
      a.find(".ow")
        .change(function() {
          d.outline_width = $(this).val() >> 0;
          D();
        })
        .keyup(function() {
          d.outline_width = $(this).val() >> 0;
          D();
        })
        .val(d.outline_width);
      a.find(".mm-vertical-align").change(function() {
        b = $(this).val();
        D();
      });
      a.find(".mm-text-align").change(function() {
        k = $(this).val();
        D();
      });
      a.find(".mm-font-apply-to-all").click(function() {
        for (var a = 0; a < h.length; a++) {
          var b = h[a],
            c = b.$edit;
          b !== d &&
            "text" === b.type &&
            (b.setFont(d.font),
            b.setForceCaps(g),
            c
              .find(".mm-size")
              .val(d.size)
              .change(),
            c
              .find(".mm-use-shadow")
              .prop("checked", q)
              .change(),
            c
              .find(".mm-font-bold")
              .prop("checked", f)
              .change(),
            c
              .find(".mm-font-italic")
              .prop("checked", m)
              .change(),
            c
              .find(".ow")
              .val(d.outline_width)
              .change(),
            c
              .find(".mm-text-align")
              .val(k)
              .change());
        }
      });
      var r = (d.setText = function(a) {
          a = a !== z ? a : B.val();
          d.text = g ? a.toUpperCase() : a;
          D();
        }),
        v = (d.setFont = function(b) {
          b = b.toLowerCase() || "impact";
          a.find(".mm-font").val(b);
          a.find(".mm-font-label").text(b);
          d.font = b;
          D();
        });
      d.getFont = function() {
        return d.font;
      };
      d.isForcedCaps = function() {
        return g;
      };
      d.setForceCaps = function(b) {
        g = !!b;
        a.find(".mm-all-caps").prop("checked", g);
        r();
      };
      d.usesShadow = function() {
        return q;
      };
      d.setFontShadow = function(b) {
        q = !!b;
        a.find(".mm-use-shadow").prop("checked", q);
        D();
      };
      d.isFontBold = function() {
        return f;
      };
      d.isFontItalic = function() {
        return m;
      };
      d.verticalAlign = function() {
        return b;
      };
      d.textAlign = function() {
        return k;
      };
      d.updateColors = function() {
        d.font_color = a
          .find(".mm-font-color-picker")
          .data("picker")
          .getColor();
        d.outline_color = a
          .find(".mm-outline-color-picker")
          .data("picker")
          .getColor();
        D();
      };
      d.setFontColor = function(b) {
        a.find(".mm-font-color-picker")
          .data("picker")
          .setColor(b);
      };
      d.setOutlineWidth = function(b) {
        a.find(".ow")
          .val(b)
          .change();
      };
      d.setOutlineColor = function(b) {
        a.find(".mm-outline-color-picker")
          .data("picker")
          .setColor(b);
      };
      d.getVals = function() {
        var a = t.getVals();
        return {
          x: a.x / u,
          y: a.y / u,
          w: a.w / u,
          h: a.h / u,
          rotation: a.rotation,
          font: d.font,
          font_size: (e / 1.32 / u) >> 0,
          font_color: d.font_color,
          font_shadow: q ? 1 : 0,
          outline_width: d.outline_width,
          outline_color: d.outline_color,
          force_caps: g ? 1 : 0,
          text_align: k,
          vertical_align: b
        };
      };
      d.setVals = function(b, a, c, d, f) {
        t.setVals((b * u) >> 0, (a * u) >> 0, (c * u) >> 0, (d * u) >> 0, f);
      };
      d.constrainVals = function() {
        t.constrainVals();
      };
      d.setVerticalAlign = function(b) {
        a.find(".mm-vertical-align")
          .val(b)
          .change();
      };
      d.setTextAlign = function(b) {
        a.find(".mm-text-align")
          .val(b)
          .change();
      };
      d.setPlaceholder = function(b) {
        a.find(".mm-text").attr("placeholder", b);
      };
      d.autoResize = function(a, c, d) {
        var f, e;
        d
          ? ((a = a * u - 10),
            (f = (c * u) / 4),
            (d = c = 5),
            "bottom" === b
              ? (d = 3 * f - 13)
              : "middle" === b && (d = 1.5 * f - 2),
            (e = 0))
          : ((f = ba / ab),
            (e = t.getVals()),
            (c = f * e.x),
            (d = f * e.y),
            (a = f * e.w),
            (f *= e.h),
            (e = e.rotation));
        t.setVals(c, d, a, f, e);
      };
      d.draw = function() {
        var a = t.getVals(),
          c = O / ba,
          h = a.x,
          g = a.y,
          r = a.w,
          n = a.h;
        12 < a.w &&
          ((h = Math.round(c * a.x) + 3), (r = Math.round(c * a.w) - 6));
        12 < a.h &&
          ((g = Math.round(c * a.y) + 3), (n = Math.round(c * a.h) - 6));
        p.save();
        p.shadowBlur = q ? d.outline_width : 0;
        p.shadowColor = q ? d.outline_color : "";
        for (
          var x = d.text,
            l = x.length,
            B = (2 + l / 30) >> 0,
            v = x.trim().split(/\s+/).length,
            w = [],
            H = /\r\n?|\n/g;
          (c = H.exec(x));

        )
          w.push(c.index);
        for (
          var c = (Math.sqrt((l * n) / r / 2.8) + 0.5) >> 0,
            c = Math.max(w.length + 1, Math.min(v, c)),
            Eb = l / c,
            z = [],
            v = [],
            C = [],
            H = 0;
          ;

        ) {
          var A = x.slice(H + 1).search(/\s/);
          if (-1 !== A) (H = H + A + 1), C.push(H);
          else break;
        }
        A = d.size + 2;
        do {
          A -= 2;
          p.font =
            (f ? "bold " : "") +
            (m ? "italic " : "") +
            A +
            "px " +
            d.font +
            ("impact" === d.font ? ",impac" : "");
          for (var E = 0; E <= c; E++)
            if (0 === E) z[E] = 0;
            else if (E === c) z[E] = l;
            else {
              var D = ((Eb * E) >> 0) - B;
              0 > D && (D = 0);
              for (var G = -1, F = Infinity, H = 0; H < C.length; H++) {
                var u = Math.abs(C[H] - D);
                u < F && ((G = C[H]), (F = u));
              }
              z[E] = G;
            }
          for (E = 0; E < w.length; E++)
            if (((D = w[E]), -1 === z.indexOf(D))) {
              for (
                var G = {}, N = -1, F = Infinity, H = 1;
                H < z.length - 1;
                H++
              ) {
                var K = z[H],
                  u = Math.abs(K - D);
                u < F && (-1 === w.indexOf(K) || G[K]) && ((N = H), (F = u));
                G[K] = !0;
              }
              z[N] = D;
            }
          w.length &&
            z.sort(function(a, b) {
              return a > b ? 1 : -1;
            });
          for (E = 0; E < c; E++)
            (K = E ? z[E] + 1 : 0),
              (u = x.substr(K, z[E + 1] - K)),
              (v[E] = {text: u});
          F = 4 + 0.1 * A;
          for (E = u = H = 0; E < c; E++)
            (v[E].w = p.measureText(v[E].text).width),
              (v[E].h = v[E].text ? 0.86 * A : 0),
              v[E].w > H && (H = v[E].w),
              (u += v[E].h + (E && v[E].text ? F : 0));
        } while (H > r || u > n);
        e = A;
        x = n - u;
        "top" === b && (x = 0);
        "middle" === b && (x /= 2);
        a.rotation &&
          (p.translate(h + r / 2, g + n / 2),
          p.rotate((a.rotation / 180) * Math.PI),
          p.translate(-h - r / 2, -g - n / 2));
        l = x;
        for (H = 0; H < c; H++)
          if (
            ((x =
              "left" === k ? 0 : "right" === k ? r - v[H].w : (r - v[H].w) / 2),
            (l += v[H].h + (H && v[H].text ? F : 0)),
            (u = v[H].text),
            (p.fillStyle = d.font_color),
            q)
          )
            for (B = 0; B < (d.outline_width ? 6 : 1); B++)
              p.fillText(u, h + x, g + l - 2);
          else
            p.fillText(u, h + x, g + l - 2),
              d.outline_width &&
                ((p.strokeStyle = d.outline_color),
                (p.lineWidth = d.outline_width),
                p.strokeText(u, h + x, g + l - 2));
        a.rotation &&
          (p.translate(h + r / 2, g + n / 2),
          p.rotate((-a.rotation / 180) * Math.PI),
          p.translate(-h - r / 2, -g - n / 2));
        p.restore();
      };
      B.on("keyup change", function() {
        r();
      });
      ja.after(l);
      c.coords && ((c = c.coords), t.setVals(c[0], c[1], c[2], c[3]));
    }
    function Hb(a, b, c, d, e) {
      this.type = "image";
      this.$edit = a;
      this.element = b;
      this.displayName = c;
      this.isPreset = !!d;
      this.templateId = e;
      a = this.$box = $("<div/>", {class: "drag-box off"});
      var h = new Dragger(
        a,
        ga,
        function() {
          D();
          Xa && Xa();
        },
        {enforceBoundary: !1, enableRotate: qb}
      );
      a.hover(
        function() {
          clearTimeout(qa);
          $(".drag-box").removeClass("off");
        },
        function() {
          qa = setTimeout(function() {
            $(".drag-box").addClass("off");
          }, 10);
        }
      );
      this.getVals = function() {
        var a = h.getVals();
        return {
          x: (a.x / u) >> 0,
          y: (a.y / u) >> 0,
          w: (a.w / u) >> 0,
          h: (a.h / u) >> 0,
          rotation: a.rotation
        };
      };
      this.setVals = function(a, b, c, d, e) {
        h.setVals((a * u) >> 0, (b * u) >> 0, (c * u) >> 0, (d * u) >> 0, e);
      };
      this.constrainVals = function() {
        h.constrainVals();
      };
      this.autoResize = function(a, c, d) {
        var e;
        if (d)
          (a = c = Math.min(((a * u) / 3) >> 0, ((c * u) / 3) >> 0)),
            b.width > b.height
              ? ((d = a), (e = (b.height / b.width) * d))
              : ((e = a), (d = (b.width / b.height) * e));
        else {
          e = ba / ab;
          var g = h.getVals();
          a = e * g.x;
          c = e * g.y;
          d = e * g.w;
          e *= g.h;
        }
        h.setVals(a, c, d, e);
      };
      this.draw = function() {
        var a = h.getVals(),
          c = O / ba,
          d = ~~Math.round(c * a.x),
          e = ~~Math.round(c * a.y),
          g = ~~Math.round(c * a.w),
          c = ~~Math.round(c * a.h);
        a.rotation &&
          (p.translate(d + g / 2, e + c / 2),
          p.rotate((a.rotation / 180) * Math.PI),
          p.translate(-d - g / 2, -e - c / 2));
        p.drawImage(b, d, e, g, c);
        a.rotation &&
          (p.translate(d + g / 2, e + c / 2),
          p.rotate((-a.rotation / 180) * Math.PI),
          p.translate(-d - g / 2, -e - c / 2));
      };
      ja.after(a);
      this.autoResize(v().w, v().h, !0);
      h.lockRatio();
    }
    function rb() {
      za.find(".mm-draw-btn").text(la ? "Draw" : "Stop Drawing");
      za.find(
        ".mm-add-img,.mm-add-img-quick,.mm-rotate,.mm-add-spacing"
      ).toggle(la);
      za.find(".color-picker,.erase,.mm-draw-width-slider").toggle(!la);
      $(".drag-box").toggle(la);
      ga.toggleClass("mm-drawing", !la);
      if (la) ja.off("vmousedown", sb);
      else ja.on("vmousedown", sb);
      la = !la;
    }
    function sb(a) {
      a.preventDefault();
      var b = a.clientX - $(this).offset().left + $(k).scrollLeft();
      a = a.clientY - $(this).offset().top + $(k).scrollTop();
      var c = O / ba,
        b = Math.round(c * b);
      a = Math.round(c * a);
      da.beginPath();
      p.beginPath();
      da.moveTo(b, a);
      p.moveTo(b, a);
      p.save();
      p.lineCap = "round";
      p.lineWidth = Ya;
      p.strokeStyle = ra;
      p.shadowColor = ra;
      p.shadowBlur = 2;
      da.lineCap = "round";
      da.lineWidth = Ya;
      da.strokeStyle = ra;
      da.shadowColor = ra;
      da.shadowBlur = 2;
      $("body").addClass("nosel");
      ja.on("vmousemove", tb);
      $d.on("vmouseup", ub);
    }
    function tb(a) {
      var b = a.clientX - $(this).offset().left + $(k).scrollLeft();
      a = a.clientY - $(this).offset().top + $(k).scrollTop();
      var c = O / ba,
        b = Math.round(c * b);
      a = Math.round(c * a);
      da.lineTo(b, a);
      da.stroke();
      p.lineTo(b, a);
      p.stroke();
      da.beginPath();
      p.beginPath();
      da.moveTo(b, a);
      p.moveTo(b, a);
      sa = !0;
    }
    function ub() {
      p.restore();
      $("body").removeClass("nosel");
      ja.off("vmousemove", tb);
      $d.off("vmouseup", ub);
    }
    function vb() {
      $("#mygen").hide();
      $("#memewrap").show();
      $(".mm-tab").removeClass("set");
      $("#memetab").addClass("set");
      if (!$("#memewrap").html()) {
        var a = 0,
          b = "",
          e = 0,
          d,
          h = "//s.imgflip.com/ms" + spriteNum + ".jpg",
          g;
        for (g in c)
          if (c.hasOwnProperty(g) && !isNaN(g)) {
            a++;
            d = 'style="background:url(' + h + ") " + -50 * e + 'px 0px;"';
            e++;
            var k = esc(c[g].name),
              b =
                b +
                ('<div class="im" ' +
                  d +
                  ' data-key="' +
                  esc(g) +
                  '" alt="' +
                  k +
                  ' Meme Image" title="Make ' +
                  k +
                  ' Meme"></div>');
          }
        $("#memewrap").append(
          b +
            '<a class="y but" tabindex="-1" id="allTemplates" href="/memetemplates">View All Meme Templates</a>'
        );
      }
    }
    function Ib() {
      $("#memewrap").hide();
      $("#mygen").show();
      $(".mm-tab").removeClass("set");
      $("#mytab").addClass("set");
      wb ||
        (I.user.id || -1 === k.location.href.search("memegenerator")
          ? ($.getJSON("/ajax_get_my_generators", function(a) {
              if (a.error) MSG(a.error, "red");
              else {
                $.extend(c, a);
                var b = "",
                  e,
                  d;
                for (d in a)
                  (a = c[d]),
                    (e = a.img
                      ? a.img.src
                      : IMAGE_DOMAIN + "2/" + (+a.id).toString(36) + ".jpg"),
                    (b +=
                      "<img class='im um' src='" +
                      esc(e) +
                      "' data-key='" +
                      esc(d) +
                      "' title='" +
                      esc(a.name) +
                      "'/>");
                b =
                  b ||
                  "<div style='line-height:50px;padding-left:10px;'>Upload an image to create your first custom generator!</div>";
                $("#mygen").append(b);
              }
            }),
            (wb = !0))
          : $("#mygen").append(
              "<div style='line-height:50px;padding-left:10px;'><a rel='nofollow' href='/login?redirect=/memegenerator'>Login</a> or <a rel='nofollow' href='/signup?redirect=/memegenerator'>Signup</a> to view any custom templates you upload!"
            ));
    }
    function Ia(a, b, c, d, e) {
      var h = a.val().trim();
      if (!(1 > h.length || (!0 !== e && h === a.data("previous_query")))) {
        var g = +new Date();
        xb = g;
        a.data("previous_query", h);
        var f = h + (c ? "@^" : "") + (d ? "^@" : "");
        eb[f]
          ? yb(b, eb[f], h)
          : (b.find(".mm-search-loading").addClass("mm-search-visible"),
            b.removeClass("mm-hidden"),
            $.ajax({
              url: "/ajax_meme_search_new",
              data: {
                q: h,
                transparent_only: d ? 1 : 0,
                include_nsfw: c ? 1 : 0
              },
              dataType: "json",
              success: function(a) {
                var c = g === xb;
                c &&
                  b.find(".mm-search-loading").removeClass("mm-search-visible");
                if (a.error) error_dialog(a.error);
                else {
                  for (var d = 0; d < a.results.length; d++)
                    Aa[+a.results[d].id] = a.results[d];
                  eb[f] = a.results;
                  c && yb(b, a.results, h);
                }
              }
            }));
      }
    }
    function yb(a, b, c) {
      for (var d = "", e = {}, h = 0; h < b.length; h++) {
        var g = b[h].result_type,
          f = e[g],
          k = b[h],
          l = "",
          l = l + ('<tr class="mm-search-result" data-id="' + k.id + '">'),
          l = l + '<td class="mm-search-result-img-td">',
          l =
            l +
            ('<img class="mm-search-result-img" src="https:' +
              IMAGE_DOMAIN +
              "2/" +
              (+k.id).toString(36) +
              '.jpg"/>'),
          l = l + "</td>",
          l = l + '<td class="mm-search-result-text">',
          l = l + esc(k.name);
        "mp4" === k.file_type &&
          (l += '<div class="mm-search-result-subtitle">animated</div>');
        +k.has_transparency &&
          (l +=
            '<div class="mm-search-result-subtitle">contains transparency</div>');
        l += "</td>";
        l += "</tr>";
        e[g] = f + l;
      }
      d += fb("Featured Memes", !e.featured);
      d += e.featured;
      d += fb("User Templates", !e.user);
      d += e.user;
      e.my && ((d += fb("My Templates")), (d += e.my));
      d =
        d +
        '<tr class="mm-search-view-all"><td colspan="2">' +
        ('<a class="l but mm-search-view-all-btn" href="/memesearch?q=' +
          esc(encodeURIComponent(c)) +
          '">View All Meme Templates</a>');
      d += "</td></tr>";
      a.find(".mm-search-results-table").html(d);
      a.removeClass("mm-hidden");
      a.data("latest_query", c);
    }
    function fb(a, b) {
      return (
        '<tr class="mm-search-section-title"><td colspan="2">' +
        a +
        (b ? '<div class="mm-search-no-results">no results</div>' : "") +
        "</td></tr>"
      );
    }
    function zb(a, b, c, d) {
      var e = new Image();
      "http" === a.substr(0, 4) && e.setAttribute("crossorigin", "anonymous");
      $(e).load(function() {
        var a = $(
          '<div class="mm-box-edit"><div class="mm-box-remove" title="remove this image">' +
            X_SVG +
            '</div><div class="mm-img-box-name">' +
            esc(b) +
            "</div></div>"
        );
        G.find(".mm-boxes").append(a);
        h.push(new Hb(a, e, b, c, d));
        D();
        loading(!1);
        Ha(!0);
        Ua && Ua(a);
      });
      e.src = a;
    }
    function Ab(a) {
      gb = gb || $.getScript("https://checkout.stripe.com/checkout.js");
      hb = hb || $.getScript("https://js.stripe.com/v3/");
      var b = $("#pro-basic-popup-wrap").html(),
        c = BOX.show({
          html:
            '<div class="pro-basic-popup"><div class="pro-popup-msg msg msg-green">You can remove the imgflip.com watermark with Imgflip Pro Basic!</div>' +
            b +
            "</div>"
        });
      $.when(gb, hb).done(function() {
        initProStripe(c.el(), "pro_basic");
      });
      proEvent("pro_basic", "Clicked " + a);
    }
    t = t || {};
    var l = this,
      W = $(t.$previewOuter || "#mm-preview-outer"),
      ga = $(t.$preview || ".mm-preview"),
      ja = ga.find(".mm-canv"),
      Jb = ga.find(".mm-img"),
      G = $(t.settingsDiv || "#mm-settings"),
      ta = $("#mm-search"),
      O,
      ea,
      ba = W.width(),
      ab = ba,
      Pa,
      Kb = t.noDraw,
      ib = t.numTexts >> 0,
      Gb = t.fontSize || 50,
      lb = !1,
      na = "#000000 #ffffff #995555 #ff3333 #ff8800 #eeee00 #22ee22 #00bff3 #3333ff #dd00cc".split(
        " "
      ),
      sa = !1,
      la = !1,
      u = 1,
      qb = t.allowBoxRotation,
      Wa = "#ffffff",
      T,
      K = "",
      Qa = "",
      xa = "",
      Bb = t.selectCallback,
      Xa = t.draggerCallback,
      Ua = t.boxAdded,
      Cb = t.boxRemoved,
      pb = t.preDraw,
      ia,
      da,
      ra,
      Ya = 5,
      X,
      h,
      qa,
      V,
      A = ja[0],
      za;
    (A.getContext && A.toDataURL && A.getContext("2d")) ||
      alert(
        "The Meme Generator requires a modern browser with HTML5 canvas support. Your browser is too old. Try Chrome or Firefox."
      );
    var p = A.getContext("2d");
    l.hideBox = function(a, b) {
      return h[a].hidden ? !1 : ((h[a].hidden = !0), b ? Va() : D(), !0);
    };
    l.showBox = function(a, b) {
      return h[a].hidden ? ((h[a].hidden = !1), b ? Va() : D(), !0) : !1;
    };
    l.previewWidth = function() {
      return ba;
    };
    l.setMaxPreviewHeight = function(a) {
      Pa = a;
    };
    l.canvasWidth = function() {
      return O;
    };
    l.canvasHeight = function() {
      return ea;
    };
    l.setCanvasWidth = function(a) {
      var b = v();
      O = a;
      ea = Math.round((b.h / b.w) * O);
      ja.attr({width: O, height: ea});
      ia && ($(ia).attr({width: O, height: ea}), (sa = !1));
      B(Math.min(O, W.width()));
    };
    l.setFont = function(a) {
      for (var b = 0; b < h.length; b++)
        "text" === h[b].type && h[b].setFont(a);
    };
    l.setForceCaps = function(a) {
      for (var b = 0; b < h.length; b++)
        h[b].setForceCaps && h[b].setForceCaps(a);
    };
    l.ctx = function() {
      return p;
    };
    l.canv = function() {
      return A;
    };
    var v = (l.currentMeme = function() {
      return c[V];
    });
    l.text = l.getText = function(a) {
      if (a !== z) return h[a] ? (h[a].text || "").trim() : "";
      a = "";
      for (var b = 0; b < h.length; b++)
        h[b].text && (a += (a ? " " : "") + h[b].text.trim());
      return a;
    };
    l.boxCount = function(a) {
      for (var b = 0, c = h.length - 1; 0 <= c; c--)
        (a && h[c].type !== a) || b++;
      return b;
    };
    l.isEmpty = function() {
      return !l.getText() && !l.boxCount("image") && !sa;
    };
    l.memeData = function(a, b) {
      var e = [],
        d,
        g = 0,
        k = 0;
      a = a || O / v().w;
      b = b || ea / v().h;
      for (var l = 0; l < h.length; l++)
        (d = h[l].getVals()),
          e.push({
            type: h[l].type,
            x: (a * d.x) >> 0,
            y: (b * d.y) >> 0,
            w: (a * d.w) >> 0,
            h: (b * d.h) >> 0,
            rotation: d.rotation
          }),
          "text" === h[l].type
            ? $.extend(e[l], {
                font_color: h[l].font_color,
                outline_width: h[l].outline_width,
                outline_color: h[l].outline_color,
                font: h[l].getFont(),
                font_max_size: (d.font_size * b) >> 0,
                font_shadow: h[l].usesShadow() ? 1 : 0,
                font_bold: h[l].isFontBold() ? 1 : 0,
                font_italic: h[l].isFontItalic() ? 1 : 0,
                force_caps: h[l].isForcedCaps() ? 1 : 0,
                text_align: h[l].textAlign(),
                vertical_align: h[l].verticalAlign(),
                text: h[l].isForcedCaps() ? h[l].text.toUpperCase() : h[l].text
              })
            : "image" === h[l].type &&
              ($.extend(e[l], {
                template_id: h[l].templateId,
                display_name: h[l].displayName
              }),
              g++,
              h[l].isPreset && k++);
      d = T !== z ? c[T] : v();
      return {
        boxes: e,
        template: 100 < d.id ? d.id : "",
        template_url: v().template_url || "",
        templates: v().templates,
        num_imgs: g,
        num_scumbag_hats: k,
        transparency_color: G.find(".mm-transparency-color-wrap").is(":visible")
          ? Wa
          : "",
        spacing_type: K,
        spacing_color: Qa,
        spacing_size: xa,
        effect: v().effect || "",
        has_drawing: sa ? 1 : 0
      };
    };
    var Lb = (l.toggleSetDefaultSettingsBtn = function() {
      var a = I.user.id && (4 < I.user.priv || I.user.id === c[V].uid);
      G.find(".mm-set-default-settings").toggle(!!a);
    });
    l.ajaxSetDefaultSettings = function() {
      if (
        confirm(
          "This will change the default text box settings for everyone who uses this template in the future, including text box positions, font family, and font colors. Are you sure you want to save your current text box settings as the default?"
        )
      ) {
        for (var a = [], b = 0; b < h.length; b++)
          "text" === h[b].type && a.push(h[b].getVals());
        loading("Saving text box settings");
        $.ajax({
          url: "/ajax_set_meme_positions",
          type: "post",
          dataType: "json",
          data: {meme_id: v().id, settings: a},
          success: function(a) {
            loading(!1);
            a.error ? error_dialog(a.error) : MSG("Settings Saved!", "green");
          }
        });
      }
    };
    l.reset = function() {
      $(".mm-text")
        .val("")
        .change();
      $(".gen-anon, .gen-private").attr("checked", !1);
      l.select(T || V);
      la && rb();
    };
    l.removeBox = function(a) {
      h[a].$box.remove();
      h[a].$edit.remove();
      h.splice(a, 1);
      Cb && Cb(a);
    };
    l.getBoxes = function() {
      return h;
    };
    l.select = function(a, b) {
      "spaced" !== a &&
        T !== z &&
        ((T = z),
        W.find(".mm-spacing-type")
          .val("")
          .change());
      var e = c[V];
      V = a;
      var d,
        g = c[a],
        k = g.w,
        q = g.h;
      O = N(g.w, g.h);
      ea = (g.h / g.w) * O;
      F(Math.min(O, W.width()));
      if (!1 !== b) {
        var f;
        for (d = h.length - 1; 0 <= d; d--)
          "text" !== h[d].type && l.removeBox(d);
        var m = Math.min(2, h.length);
        if (g.default_settings) {
          f = JSON.parse(g.default_settings);
          m = f.length - h.length;
          for (d = 0; d < m; d++) l.addText("middle");
          m = f.length;
        } else
          1 < h.length &&
            (h[0].setVerticalAlign("top"),
            h[1].setVerticalAlign("bottom"),
            h[0].setPlaceholder("Top Text"),
            h[1].setPlaceholder("Bottom Text"));
        for (d = h.length - 1; d >= m; d--) l.removeBox(d);
        m = [];
        e && e.default_settings && (m = JSON.parse(e.default_settings));
        for (d = 0; d < h.length; d++)
          if ((h[d].autoResize(k, q, !0), f && f[d]))
            (e = f[d]),
              g.rotation || h[d].setVals(e.x, e.y, e.w, e.h, e.rotation),
              h[d].setFont(e.font),
              h[d].setFontColor(e.font_color),
              h[d].setFontShadow(e.font_shadow !== z ? e.font_shadow : !0),
              h[d].setOutlineWidth(e.outline_width !== z ? e.outline_width : 5),
              h[d].setOutlineColor(e.outline_color),
              h[d].setForceCaps(e.force_caps),
              h[d].setTextAlign(e.text_align),
              h[d].setVerticalAlign(e.vertical_align),
              h[d].setPlaceholder("Text #" + (d + 1));
          else {
            e = m[d] || {};
            e.font === h[d].getFont() && h[d].setFont("impact");
            e.font_color === h[d].font_color && h[d].setFontColor("#ffffff");
            if (
              e.font_shadow === h[d].font_shadow ||
              e.outline_width === h[d].outline_width
            )
              h[d].setFontShadow(!0), h[d].setOutlineWidth(5);
            e.outline_color === h[d].outline_color &&
              h[d].setOutlineColor("#000000");
            e.force_caps === h[d].isForcedCaps() && h[d].setForceCaps(!0);
            e.text_align === h[d].textAlign() && h[d].setTextAlign("center");
          }
      }
      d = P(g);
      ja.attr({width: O, height: ea});
      ia && ($(ia).attr({width: O, height: ea}), (sa = !1));
      k = $(X).attr("src");
      d !== k &&
        ($(X)
          .off("load")
          .on("load", function() {
            if (p.getImageData) {
              var a = ma.createElement("canvas"),
                b = X.naturalWidth,
                c = X.naturalHeight;
              a.width = b;
              a.height = c;
              a.getContext("2d").drawImage(X, 0, 0, b, c);
              a = Mb(a);
              b = G.find(".mm-transparency-color-picker");
              a &&
                (b.data("picker") ||
                  new Y(
                    b,
                    Wa,
                    na,
                    function(a) {
                      Wa = a;
                      D();
                    },
                    "Change Transparency Color"
                  ));
              b.closest(".mm-transparency-color-wrap").toggle(a);
            }
            D();
          }),
        d &&
          ("http" === d.substr(0, 4)
            ? X.setAttribute("crossorigin", "anonymous")
            : X.removeAttribute("crossorigin"),
          $(X).attr("src", d)));
      D();
      $("#mm-meme-title")
        .text(g.name || "Untitled Template")
        .css({"font-weight": 700});
      G.find(".mm-effect").val(g.effect || "");
      Lb();
      Bb && Bb(g);
    };
    l.setMemes = function(a) {
      c = a;
    };
    l.addTextAuto = function() {
      var a = l.boxCount("text");
      Da(1 < a ? "middle" : "top", "Text #" + (a + 1), {}, !0);
      Ha(!0);
    };
    l.init = function() {
      h = [];
      qa = V = 0;
      X = Jb[0];
      var a = ja;
      if (!Kb) {
        za = W.find(".mm-draw-panel");
        var b = $(
            '<div class="erase l but sml" title="erase all drawing">erase</div>'
          ),
          p = $('<div class="mm-draw-btn l but sml">Draw</div>'),
          d = $("<div/>"),
          t = $('<div class="mm-draw-width-slider">'),
          n = $(
            '<div class="mm-add-img-quick l but sml"><img alt="Add scumbag hat or other icon to meme" src="https:' +
              IMAGE_DOMAIN +
              '2x0jn0.png"/></div>'
          ),
          q = $('<div class="mm-add-img l but sml">Add Image</div>'),
          f = $('<div class="mm-add-spacing l but sml">Spacing</div>'),
          m = $(
            '<div class="mm-rotate l but sml" title="Rotate image">' +
              ROTATE_SVG +
              "</div>"
          );
        za.append(b)
          .append(p)
          .append(d)
          .append(t)
          .append(q)
          .append(n)
          .append(f)
          .append(m);
        ia = $("<canvas/>")[0];
        da = ia.getContext("2d");
        p.click(rb);
        b.click(function() {
          ia.width = ia.width;
          sa = !1;
          D();
        });
        n.click(function() {
          var a;
          a =
            '<div class="mm-quick-imgs"><div class="mm-quick-img-note">Featured Transparent Images</div>';
          for (var b = 0; b < e.length; b++) {
            var c = ~~e[b].id,
              d = e[b].name,
              f =
                "https:" + IMAGE_DOMAIN + c.toString(36) + "." + e[b].file_type;
            a +=
              '<div class="mm-quick-img-wrap" data-id="' +
              c +
              '" data-name="' +
              esc(d) +
              '" title="' +
              esc(d) +
              '">';
            a += '<img class="mm-quick-img" src="' + esc(f) + '"/>';
            a += "</div>";
          }
          if (g)
            for (
              a +=
                '<div class="mm-quick-img-note">Popular User-Uploaded Transparent Images</div>',
                b = 0;
              b < g.length;
              b++
            )
              (c = ~~g[b].id),
                (d = g[b].name),
                (f =
                  "https:" +
                  IMAGE_DOMAIN +
                  c.toString(36) +
                  "." +
                  g[b].file_type),
                (a +=
                  '<div class="mm-quick-img-wrap" data-id="' +
                  c +
                  '" data-name="' +
                  esc(d) +
                  '" title="' +
                  esc(d) +
                  '">'),
                (a += '<img class="mm-quick-img" src="' + esc(f) + '"/>'),
                (a += "</div>");
          a +=
            '<div class="mm-quick-img-note">tip: You can upload or search for more transparent images using the "Add Image" button!</div>';
          a += "</div>";
          var h = new Box({html: a, w: 320});
          h.el().on("click", ".mm-quick-img-wrap", function() {
            h.hide();
            loading("Adding Image");
            zb(
              $(this)
                .find("img")
                .attr("src"),
              $(this).data("name"),
              !0,
              $(this).data("id")
            );
          });
        });
        m.click(Ja);
        q.click(function() {
          Nb();
        });
        f.click(function() {
          var a = W.find(".mm-spacing-type");
          "" === a.val() ? a.val("top_bottom").change() : a.val("").change();
        });
        W.on(
          "change",
          ".mm-spacing-type,.mm-spacing-color,.mm-spacing-size",
          wa
        );
        za.css({display: "block"});
        var w = new Slider("", t, 0, {
          min: 1,
          max: 32,
          val: Ya,
          showVal: !0,
          update: function(a) {
            Ya = a;
          }
        });
        ra = na[3];
        w.setBG(ra);
        new Y(
          d,
          na[3],
          na,
          function(a) {
            ra = a;
            w.setBG(a);
          },
          "Change Line Color"
        );
      }
      1 < ib && Da("top", "Top Text");
      0 < ib && Da("bottom", "Bottom Text");
      for (b = 2; b < ib; b++) Da("middle", "Text #" + (b + 1));
      var z = $("#memewrap"),
        u = $("#mm-search-dropdown");
      ta.on(
        "keyup change paste focus",
        debounce(function() {
          ta.is(":focus") &&
            (u.toggleClass("mm-hidden", 1 > $(this).val().length),
            Ia(ta, u, !0));
        }, 300)
      );
      ta.on("keydown", function(a) {
        13 === a.which &&
          (ta.blur(),
          u
            .find(".mm-search-result")
            .eq(0)
            .click());
      });
      ta.on("click", stopProp);
      $d.on("click", function() {
        u.addClass("mm-hidden");
      });
      u.on("click", ".mm-search-result", function() {
        var a = +$(this).data("id"),
          b;
        for (b in c)
          if (c.hasOwnProperty(b) && +c[b].id === a) {
            mm.select(b);
            u.addClass("mm-hidden");
            return;
          }
        if ("mp4" === Aa[a].file_type) {
          if (
            !confirm(
              "This meme is animated so you will be redirected to the GIF Maker. Continue?"
            )
          )
            return;
          loading("Opening GIF Maker");
          b = Aa[a];
          var d = b.name
            .trim()
            .replace(/\s+/, "-")
            .replace(/[^a-zA-Z0-9\-]/, "");
          k.location = "/gif-maker/" + (d ? b.id + "/" + d : b.id);
        }
        c["search" + a] = Aa[a];
        b = IMAGE_DOMAIN + "2/" + (+a).toString(36) + ".jpg";
        d = Aa[a].name;
        z.prepend(
          '<img class="im" src="' +
            b +
            '" data-key="search' +
            esc(a) +
            '" alt="' +
            esc(d) +
            '" title="Caption ' +
            esc('"' + d + '"') +
            '"/>'
        );
        mm.select("search" + a);
        u.addClass("mm-hidden");
      });
      u.on("click", stopProp);
      G.on("click", "#allTemplates", function() {
        var a = ta.val();
        a && $(this).attr("href", "/memesearch?q=" + encodeURIComponent(a));
      });
      a.hover(
        function() {
          clearTimeout(qa);
          ga.find(".drag-box").removeClass("off");
        },
        function() {
          qa = setTimeout(function() {
            ga.find(".drag-box").addClass("off");
          }, 10);
        }
      )
        .click(function(a) {
          a.preventDefault();
        })
        .show();
      G.find(".mm-add-text").click(l.addTextAuto);
      G.on("click", ".mm-box-remove", function() {
        for (var a = $(this).closest(".mm-box-edit"), b = 0; b < h.length; b++)
          if (h[b].$edit.is(a)) {
            l.removeBox(b);
            l.preview();
            break;
          }
      });
      G.find(".mm-reset").click(l.reset);
      G.find(".mm-toggle-drag").change(function() {
        Ha($(this).prop("checked"));
      });
      G.find(".mm-no-watermark").change(D);
      G.find(".mm-no-watermark").click(function(a) {
        if (!I.user || !I.user.pro_type)
          return Ab("No Watermark"), cancelEvent(a);
      });
      $(".mm-show-pro-basic").click(function() {
        Ab("FAQ");
      });
      G.find(".mm-output-original-resolution").click(function() {
        if (
          sa &&
          !confirm(
            "Changing this option will remove drawings. Are you sure you wish to continue?"
          )
        )
          return !1;
        lb = $(this).prop("checked");
        var a = v();
        l.setCanvasWidth(N(a.w, a.h));
        D();
      });
      G.find(".mm-effect").change(C);
      var A = Ka.width();
      700 > A && Ha(!1);
      $("#mm-show-upload").click(ua);
      $d.on("click", ".mm-upload-rotate", function() {
        ca && ca.rotateClockwise();
      });
      $d.on("click", ".mm-upload-flip", function() {
        ca && ca.flipHorizontal();
      });
      G.find(".mm-toggle-opts").click(function() {
        var a = G.find(".mm-opts"),
          b = $(this);
        "none" === a.css("display")
          ? (a.slideDown(200), b.text("Hide Options"))
          : (a.slideUp(200), b.text("More Options"));
      });
      G.click(Fa);
      G.on("click", ".im", function() {
        l.select($(this).data("key"));
      });
      G.on("mouseenter", ".im", function() {
        var a = c[$(this).data("key")].name || "Untitled Template";
        $("#mm-meme-title")
          .text(a)
          .css({fontWeight: a === v().name ? 700 : 400});
      });
      G.on("mouseleave", ".im", function() {
        $("#mm-meme-title")
          .text(v().name || "Untitled Template")
          .css({fontWeight: 700});
      });
      Ka.resize(
        debounce(function() {
          var a = Ka.width();
          a !== A && ((A = a), B(W.width()));
        })
      );
    };
    l.initPopMemes = function() {
      $("#memetab").click(vb);
      $("#mytab").click(Ib);
      vb();
    };
    k.updateEffect = C;
    var pa,
      Ha = (l.toggleDrag = function(a) {
        a
          ? ga
              .removeClass("no-events")
              .find(".drag-box")
              .removeClass("off")
          : ga
              .addClass("no-events")
              .find(".drag-box")
              .addClass("off");
        G.find(".mm-toggle-drag").prop("checked", a);
      }),
      mb,
      bb,
      Ra,
      ca,
      Db,
      Fb = debounce(function(a, b) {
        var c = a.val();
        c !== Db &&
          ((Db = c),
          a.removeClass("error"),
          c &&
            (isValidImgUrl(c)
              ? (loading("Uploading image"),
                jb(c, function(a, e) {
                  loading(!1);
                  b.show();
                  ca = new ImageCropper(b, b.width(), b.width());
                  ca.setSrc(a, e);
                  $("#mm-upload-btns").show();
                  bb = "url";
                  Ra = c;
                }))
              : a.addClass("error")));
      }, 100),
      ya,
      nb,
      Sa = {},
      Ta = "Impact;Arial;Comic Sans MS;Helvetica;Times New Roman;Times;Courier New;Courier;Verdana;Georgia;Palatino;Garamond;Bookman;Trebuchet MS;Arial Black".split(
        ";"
      ),
      cb = "Al Bayan;Al Nile;Al Tarikh;American Typewriter;Andale Mono;Apple Braille;Apple Chancery;Apple Color Emoji;Apple SD Gothic Neo;Apple Symbols;AppleGothic;AppleMyungjo;Arial Hebrew;Arial Hebrew Scholar;Arial Narrow;Arial Unicode MS;Avenir;Avenir Next;Ayuthaya;Baghdad;Bangla MN;Bangla Sangam MN;Baskerville;Beirut;Big Caslon Medium;Bodoni 72;Bodoni Ornaments;Chalkboard;Chalkboard SE;Chalkduster;Cochin;Copperplate;Corsiva Hebrew;Damascus;DecoType Naskh;Devanagari MT;Devanagari Sangam MN;Didot;Diwan Kufi;Diwan Thuluth;Euphemia UCAS;Farah;Farisi;Futura;GB18030 Bitmap;Geeza Pro;Geneva;Gill Sans;Gujarati MT;Gujarati Sangam MN;Gurmukhi MN;Gurmukhi MT;Gurmukhi Sangam MN;Heiti SC;Heiti TC;Helvetica Neue;Herculanum;Hiragino Kaku Gothic StdN;Hiragino Maru Gothic ProN;Hiragino Mincho ProN;Hiragino Sans GB;Hiragino Sans;Hoefler Text;ITF Devanagari;ITF Devanagari Marathi;InaiMathi;Kailasa;Kannada MN;Kannada Sangam MN;Kefa;Khmer MN;Khmer Sangam MN;Kohinoor Bangla;Kohinoor Devanagari;Kohinoor Telugu;Kokonor;Krungthep;KufiStandardGK;Lao MN;Lao Sangam MN;Lucida Grande;Luminari;Malayalam MN;Malayalam Sangam MN;Marker Felt;Menlo;Microsoft Sans Serif;Mishafi Gold;Mishafi;Monaco;Mshtakan;Muna;Myanmar MN;Myanmar Sangam MN;Nadeem;New Peninim MT;Noteworthy;Optima;Oriya MN;Oriya Sangam MN;PT Mono;PT Sans;PT Sans Caption;PT Sans Narrow;PT Serif;PT Serif Caption;Papyrus;Phosphate;PingFang HK;PingFang SC;PingFang TC;Plantagenet Cherokee;Raanana;STIXGeneral;STIXIntegralsD;STIXIntegralsSm;STIXIntegralsUp;STIXIntegralsUpD;STIXIntegralsUpSm;STIXNonUnicode;STIXSizeFiveSym;STIXSizeFourSym;STIXSizeOneSym;STIXSizeThreeSym;STIXSizeTwoSym;STIXVariants;STSong;Sana;Sathu;Savoye LET Plain:1.0;Shree Devanagari 714;SignPainter-HouseScript;Silom;Sinhala MN;Sinhala Sangam MN;Skia;Snell Roundhand;Songti SC;Songti TC;Sukhumvit Set;Symbol;Tahoma;Tahoma Negreta;Tamil MN;Tamil Sangam MN;Telugu MN;Telugu Sangam MN;Thonburi;Times Roman;Trattatello;Waseem;Webdings;Wingdings;Wingdings2;Wingdings3;Zapf Dingbats;Zapfino".split(
        ";"
      ),
      ob = "Andalus;Angsana New;AngsanaUPC;Aparajita;Arabic Typesetting;Batang;BatangChe;Browallia New;BrowalliaUPC;Calibri;Cambria;Cambria Math;Candara;Consolas;Constantia;Corbel;Cordia New;CordiaUPC;DaunPenh;David;DFKai-SB;DilleniaUPC;DokChampa;Dotum;DotumChe;Ebrima;Estrangelo Edessa;EucrosiaUPC;Euphemia;FangSong;Franklin Gothic Medium;FrankRuehl;FreesiaUPC;Gabriola;Gautami;Gisha;Gulim;GulimChe;Gungsuh;GungsuhChe;IrisUPC;Iskoola Pota;JasmineUPC;KaiTi;Kalinga;Kartika;Khmer UI;KodchiangUPC;Kokila;Lao UI;Latha;Leelawadee;Levenim MT;LilyUPC;Lucida Console;Lucida Sans Unicode;Malgun Gothic;Mangal;Marlett;Meiryo;Meiryo UI;Microsoft Himalaya;Microsoft JhengHei;Microsoft New Tai Lue;Microsoft PhagsPa;Microsoft Sans Serif;Microsoft Tai Le;Microsoft Uighur;Microsoft YaHei;Microsoft Yi Baiti;MingLiU;MingLiU_HKSCS;MingLiU_HKSCS-ExtB;MingLiU-ExtB;Miriam;Miriam Fixed;Mongolian Baiti;MoolBoran;MS Gothic;MS Mincho;MS PGothic;MS PMincho;MS UI Gothic;MV Boli;Narkisim;NSimSun;Nyala;Palatino Linotype;Plantagenet Cherokee;PMingLiU;PMingLiU-ExtB;Raavi;Rod;Sakkal Majalla;Segoe Print;Segoe Script;Segoe UI;Segoe UI Light;Segoe UI Semibold;Segoe UI Symbol;Shonar Bangla;Shruti;SimHei;Simplified Arabic;Simplified Arabic Fixed;SimSun;SimSun-ExtB;Sylfaen;Symbol;Tahoma;Traditional Arabic;Tunga;Utsaah;Vani;Vijaya;Vrinda;Webdings;Wingdings".split(
        ";"
      ),
      db = [];
    l.addText = Da;
    var D = debounce(Va, 100, !1, 100, !0);
    l.preview = D;
    l.previewInstantly = Va;
    var wb = !1,
      eb = {},
      Aa = {},
      xb,
      Nb = (l.showAddImagePopup = function(a, b) {
        function e() {
          return m.find(".mm-add-img-show-nsfw").prop("checked");
        }
        function d() {
          return m.find(".mm-add-img-transparent-only").prop("checked");
        }
        function g(a, b, d, e, f) {
          var h = P(v()),
            k = new Image(),
            m = new Image();
          "http" === h.substr(0, 4) &&
            k.setAttribute("crossorigin", "anonymous");
          "http" === a.substr(0, 4) &&
            m.setAttribute("crossorigin", "anonymous");
          var n = f.hasClass("mm-add-img-type-below"),
            p = f.hasClass("mm-add-img-type-above"),
            q = f.hasClass("mm-add-img-type-left"),
            t = !1;
          f = function() {
            if (t) {
              var a = ma.createElement("canvas"),
                f = a.getContext("2d");
              if (n || p) {
                var g = Math.max(k.width, m.width),
                  h = (g / k.width) * k.height,
                  r = (g / m.width) * m.height;
                a.width = g;
                a.height = h + r;
                f.drawImage(k, 0, 0, k.width, k.height, 0, n ? 0 : r, g, h);
                f.drawImage(m, 0, 0, m.width, m.height, 0, n ? h : 0, g, r);
              } else
                (g = Math.max(k.height, m.height)),
                  (h = (g / k.height) * k.width),
                  (r = (g / m.height) * m.width),
                  (a.width = h + r),
                  (a.height = g),
                  f.drawImage(k, 0, 0, k.width, k.height, q ? r : 0, 0, h, g),
                  f.drawImage(m, 0, 0, m.width, m.height, q ? 0 : h, 0, r, g);
              var y = new Image();
              $(y).load(function() {
                var a = v().templates || [{id: v().id, url: v().template_url}],
                  f = {id: b, url: e, display_name: d};
                p || q ? a.unshift(f) : a.push(f);
                c.custom = {
                  id: 0,
                  templates: a,
                  name: "Custom Image",
                  img: y,
                  w: y.width,
                  h: y.height
                };
                l.select("custom");
                loading(!1);
              });
              y.src = a.toDataURL("image/png");
            } else t = !0;
          };
          $(k).load(f);
          $(m).load(f);
          k.src = h;
          m.src = a;
        }
        function h(a) {
          if (0 !== a.type.indexOf("image"))
            error_dialog("That file is not an image!");
          else {
            var b = new FileReader();
            b.onload = function(b) {
              u.show();
              r = new ImageCropper(u, u.width(), u.width());
              r.setSrc(b.target.result, a.name);
              m.find(".mm-add-img-btns,.mm-add-img-submit").show();
            };
            b.readAsDataURL(a);
          }
        }
        function k(a) {
          loading("Loading template");
          var b = P(a);
          "/" === b[0] && (b = location.protocol + "//" + location.host + b);
          jb(b, function(b) {
            loading(!1);
            u.show();
            r = new ImageCropper(u, u.width(), u.width());
            r.setSrc(b, a.name, a.id);
            m.find(".mm-add-img-btns,.mm-add-img-submit").show();
          });
        }
        b = b || zb;
        var f;
        f =
          '<div class="mm-add-img-popup">' +
          ('<div class="mm-add-img-types concise' +
            (a ? " display-none" : "") +
            '">');
        f += '<div class="mm-add-img-type mm-add-img-type-inside selected">';
        f += '<div class="mm-add-img-type-title">Inside Current Image</div>';
        f +=
          '<div class="mm-add-img-type-diagram"><div class="mm-add-img-current"></div><div class="mm-add-img-new"></div></div>';
        f += "</div>";
        f += '<div class="mm-add-img-type mm-add-img-type-below">';
        f += '<div class="mm-add-img-type-title">Below Current Image</div>';
        f +=
          '<div class="mm-add-img-type-diagram"><div class="mm-add-img-current"></div><div class="mm-add-img-new"></div></div>';
        f += "</div>";
        f += '<div class="mm-add-img-type-more">More</div>';
        f += '<div class="mm-add-img-type mm-add-img-type-above">';
        f += '<div class="mm-add-img-type-title">Above Current Image</div>';
        f +=
          '<div class="mm-add-img-type-diagram"><div class="mm-add-img-current"></div><div class="mm-add-img-new"></div></div>';
        f += "</div>";
        f += '<div class="mm-add-img-type mm-add-img-type-left">';
        f += '<div class="mm-add-img-type-title">Left of Current Image</div>';
        f +=
          '<div class="mm-add-img-type-diagram"><div class="mm-add-img-current"></div><div class="mm-add-img-new"></div></div>';
        f += "</div>";
        f += '<div class="mm-add-img-type mm-add-img-type-right">';
        f += '<div class="mm-add-img-type-title">Right of Current Image</div>';
        f +=
          '<div class="mm-add-img-type-diagram"><div class="mm-add-img-current"></div><div class="mm-add-img-new"></div></div>';
        f += "</div>";
        f += "</div>";
        f += '<div class="mm-add-img-choose-img">';
        f +=
          '<div class="mm-add-img-upload-btn l but">Upload Image<input type="file" class="hidden-file-input"/></div>';
        f +=
          '<input class="mm-add-img-url" type="url" placeholder="Paste image URL"/>';
        f += '<div class="mm-add-img-btns">';
        f +=
          '<div class="mm-add-img-rotate l but sml">' + ROTATE_SVG + "</div>";
        f += '<div class="mm-add-img-flip l but sml">flip</div>';
        f += "</div>";
        f += '<div class="mm-add-img-preview-wrap"></div>';
        f += '<div class="mm-add-img-submit l but">Add Image</div>';
        f += '<div class="mm-add-img-or">OR</div>';
        f +=
          '<input class="mm-add-img-search" type="text" placeholder="Search Memes"/>';
        f += '<div class="mm-add-img-search-opts clearfix hidden">';
        f +=
          '<label title="Include not-safe-for-work templates"><input class="mm-add-img-show-nsfw" type="checkbox"/> <span class="checkbox-text">Include NSFW</span></label>';
        f +=
          '<label title="Only show templates containing transparency"><input class="mm-add-img-transparent-only" type="checkbox"/> <span class="checkbox-text">Transparent Only</span></label>';
        f += "</div>";
        f += '<div class="mm-search-results mm-hidden">';
        f += '<div class="mm-search-loading">loading...</div>';
        f += '<table class="mm-search-results-table"></table>';
        f += "</div>";
        f += "</div>";
        f += "</div>";
        var m = $(f),
          p = m.find(".mm-add-img-search"),
          t = m.find(".mm-search-results"),
          u = m.find(".mm-add-img-preview-wrap"),
          B = new Box({html: m}),
          r,
          w,
          z = debounce(function(a) {
            var b = a.val();
            b !== w &&
              ((w = b),
              a.removeClass("error"),
              b &&
                (isValidImgUrl(b)
                  ? (loading("Uploading image"),
                    jb(b, function(a, c) {
                      loading(!1);
                      u.show();
                      r = new ImageCropper(u, u.width(), u.width());
                      r.setSrc(a, c, 0, b);
                      m.find(".mm-add-img-btns,.mm-add-img-submit").show();
                    }))
                  : a.addClass("error")));
          }, 100);
        m.on("vclick", ".mm-add-img-type", function(a) {
          var b = $(this);
          b.parent()
            .find(".mm-add-img-type")
            .removeClass("selected");
          b.addClass("selected");
          return cancelEvent(a);
        });
        m.on("vclick", ".mm-add-img-type-more", function() {
          $(".mm-add-img-types").toggleClass("concise");
        });
        var A = !1;
        m.on("change", ".mm-add-img-show-nsfw", function() {
          $(this).prop("checked")
            ? (A ||
              confirm(
                "This will allow any user-uploaded meme template to display in the search results, which may contain not-safe-for-work content. Are you sure you want to include NSFW templates?"
              )
                ? Ia(p, t, e(), d(), !0)
                : $(this).prop("checked", !1),
              (A = !0))
            : Ia(p, t, e(), d(), !0);
        });
        m.on("change", ".mm-add-img-transparent-only", function() {
          Ia(p, t, e(), d(), !0);
        });
        var C = !0;
        m.on(
          "keyup change paste",
          ".mm-add-img-search",
          debounce(function() {
            Ia(p, t, e(), d(), !1);
            C &&
              (m.find(".mm-add-img-search-opts").removeClass("hidden"),
              (C = !1));
          }, 300)
        );
        m.on("vclick", ".mm-search-result", function(a) {
          var b = $(this).data("id");
          if (b)
            return (
              $.ajax({
                url: "/ajax_meme_search_event",
                type: "post",
                dataType: "json",
                data: {
                  meme_id: b,
                  type: "add_image_click",
                  query: t.data("latest_query")
                }
              }),
              k(Aa[b]),
              cancelEvent(a)
            );
        });
        m.on("change", ".mm-add-img-upload-btn input", function() {
          kb
            ? h(this.files[0])
            : error_dialog(
                "Your browser must have HTML5 File support to upload an image. Try upgrading to a modern browser."
              );
        });
        m.on("keyup change paste", ".mm-add-img-url", function(a) {
          var b = (a.originalEvent || a).clipboardData;
          if (b && b.items)
            for (var b = b.items, c = 0; c < b.length; c++)
              if (0 === b[c].type.indexOf("image"))
                return h(b[c].getAsFile()), cancelEvent(a);
          z($(this));
        });
        m.on("click", ".mm-add-img-submit", function() {
          var a = r.getFinalDataUrl("image/png"),
            c = r.getTemplateId(),
            d = r.getFilename(),
            e = r.getOriginalUrl();
          loading("Adding image");
          m.find(".mm-add-img-type-inside").hasClass("selected")
            ? b(a, d, !1, c)
            : g(a, c, d, e, m.find(".mm-add-img-type.selected"));
          B.hide();
        });
        m.on("click", ".mm-add-img-rotate", function() {
          r.rotateClockwise();
        });
        m.on("click", ".mm-add-img-flip", function() {
          r.flipHorizontal();
        });
      }),
      gb,
      hb;
  };
  var jb = (k.getDataUrlFromImgUrl = function(c, e) {
    var g = new Image();
    g.setAttribute("crossorigin", "anonymous");
    var t = "";
    k.URL && (t = (new URL(c).pathname || "/").substr(1));
    $(g)
      .load(function() {
        var g = ma.createElement("canvas");
        g.width = this.naturalWidth;
        g.height = this.naturalHeight;
        g.getContext("2d").drawImage(this, 0, 0);
        try {
          e(g.toDataURL("image/png"), t);
        } catch (k) {
          Ca(c, e, t);
        }
      })
      .on("error", function() {
        Ca(c, e, t);
      });
    g.src = c;
  });
  k.ColorPicker = Y;
  var Mb = (k.containsTransparency = function(c) {
    var e = c.width,
      g = c.height;
    c = c.getContext("2d");
    if (!c.getImageData) return !1;
    c = c.getImageData(0, 0, e, g).data;
    for (var k = 0, z = 0; 1e3 > z; z++) {
      var F = (Math.random() * e) >> 0,
        F = ((Math.random() * g) >> 0) * e * 4 + 4 * F;
      if (255 > c[F + 3] && (k++, 0.01 < k / 1e3)) return !0;
    }
    return !1;
  });
  k.generate = oa;
  k.imgDonePopup = Ea;
  k.imgDone = Oa;
  var Ja = k.memes && k.memes[k.initMeme] ? k.memes[k.initMeme].id : 0,
    Ba = {};
  k.ajaxUpdateRecommendedMemes = function(c) {
    c &&
      c.id &&
      c.id !== Ja &&
      ((Ja = c.id),
      Ba[c.id]
        ? $("#mm-recs-wrap").html(Ba[c.id])
        : $.ajax({
            url: "/ajax_get_meme_recs",
            data: {meme_id: c.id},
            success: function(c) {
              c.error ||
                ((Ba[c.meme_id] = c.html),
                +c.meme_id === +Ja && $("#mm-recs-wrap").html(c.html));
            }
          }));
  };
  memeInit = function() {
    $(".mm-generate").click(function() {
      oa($a, !1, !0);
    });
    $(".mm-draw-btn").click(function() {
      _gaq.push(["_trackEvent", "draw panel", "draw", mm.currentMeme().name]);
    });
    $(".mm-add-img").click(function() {
      _gaq.push([
        "_trackEvent",
        "draw panel",
        "add image",
        mm.currentMeme().name
      ]);
    });
    $(".mm-add-img-quick").click(function() {
      _gaq.push([
        "_trackEvent",
        "draw panel",
        "add image quick",
        mm.currentMeme().name
      ]);
    });
    $(".mm-rotate").click(function() {
      _gaq.push(["_trackEvent", "draw panel", "rotate", mm.currentMeme().name]);
    });
    ka.on("click", ".mm-set-default-settings", function() {
      mm.ajaxSetDefaultSettings();
    });
    $w.on("beforeunload", function() {
      return $("#done")[0] || mm.isEmpty() ? z : !0;
    });
  };
  showGenerator = function(c) {
    if (I.user.id) {
      if (
        !c.data("meme-iid") ||
        confirm(
          "You already have a meme attached to this comment, are you sure you want to overwrite it?"
        )
      )
        getMemes(),
          ka
            .off("click", ".mm-generate")
            .on("click", ".mm-generate", function() {
              loading("Generating Meme");
              oa(function(e) {
                c.find(".c-pending-img").remove();
                c.data("meme-iid", e.iid)
                  .addClass("has-pending-img")
                  .prepend(
                    '<img class="c-pending-img" src="' +
                      IMAGE_DOMAIN +
                      (+e.iid).toString(36) +
                      '.jpg"/>'
                  );
                loading(!1);
                BOX.hide();
              }, !0);
            })
            .off("click", ".mm-cancel")
            .on("click", ".mm-cancel", function() {
              BOX.hide();
            });
    } else showLogin();
  };
  var Za =
    k.requestAnimationFrame ||
    k.mozRequestAnimationFrame ||
    k.webkitRequestAnimationFrame ||
    k.msRequestAnimationFrame;
  k.lzs = function(c) {
    var e = function() {
      var e = $('<link rel="stylesheet">');
      e.attr("href", c);
      $("head").append(e);
    };
    Za ? Za(e) : k.addEventListener ? k.addEventListener("load", e) : e();
  };
  getMemes = function() {
    loading("Materializing Meme Generator");
    $.ajax({
      dataType: "json",
      url: "/ajax_get_meme_list",
      success: function(c) {
        loading(!1);
        c.error
          ? error_dialog(c.error)
          : (BOX.show({html: c.html, bg: "transparent", noMaskClick: !0}),
            (mm = new MemeMaker(c.memes, c.quick_add_imgs, c.quick_trans_imgs, {
              allowBoxRotation: !0,
              numTexts: 2
            })),
            mm.init(),
            mm.initPopMemes(),
            mm.select(0),
            I.user.pro_type || $(".gen-no-watermark-wrap").hide());
      }
    });
  };
})(window, document, $(window), $(document));
