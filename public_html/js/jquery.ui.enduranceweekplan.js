(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/user/NetBeansProjects/EnduranceWeekPlan/public_html/js/app.js":[function(require,module,exports){
(function ($) {
    $.widget("nice-site.enduranceweekplan", {
        options: {
        },
        _create: function () {
            this._render();
            this._calculate();
            this.element.on("change", "input[type='number']", $.proxy(this._calculate, this));
        },
        destroy: function(){
            this.element.off("change");
            this.element.empty();
        },
        _render: function () {
            var innerHtml = require("../templates/jquery.ui.enduranceweekplan.html");
            this.element.html(innerHtml);
            this.$rows = this.element.find("table > tbody > tr");
        },
        _calculate: function () {
            var sumPercent = 0;
            var rows = [];
            var realSummary = 0;

            //fetch data 
            var summary = Number(this.element.find("input[type='number']").eq(0).val()) || 0;
            this.$rows.each(function (index, element) {
                var $row = $(element);
                var part = Number($row.children("td").eq(1).find("input[type='number']").val()) || 0;
                var min = Number($row.children("td").eq(2).find("input[type='number']").val()) || 0;
                rows.push({
                    id: index,
                    part: part,
                    min: min
                });
            });

            //calculate summary percent
            $.each(rows, function (index, row) {
                sumPercent += row.part || 0;
            });

            //simple calculation nevertheless of minimums        
            $.each(rows, function (index, row) {
                row.percent = row.part * 100 / sumPercent;
                row.value = Math.max(row.percent * summary / 100, row.min);
                realSummary += row.value;
            });

            //we need to fix if there are minimums
            if (realSummary > summary) {
                var sumShift = 0,
                        sumShiftPercent = 0,
                        realShift = 0;
                var overflow = realSummary - summary;

                //possible summary decrease
                $.each(rows, function (index, row) {
                    row.decrease = row.value - row.min;
                    sumShift += row.decrease;
                });
                realShift = Math.min(sumShift, overflow);

                //normalize shift percents
                $.each(rows, function (index, row) {
                    row.shiftPercent = row.decrease / realShift;
                    sumShiftPercent += row.shiftPercent;
                });

                //shift values
                $.each(rows, function (index, row) {
                    var normalizedShiftPercent = row.shiftPercent / sumShiftPercent;
                    row.shift = normalizedShiftPercent * realShift;
                    row.value = row.value - row.shift;
                });
            }

            //output
            this.$rows.each(function (index, element) {
                var $row = $(element);
                $row.children("td").eq(3).text(rows[index]['value'].toFixed(1));
            });
        },
        setOption: function (key, value) {
            if (value != undefined) {
                this.options[key] = value;
                this._render();
                return this;
            }
            else {
                return this.options[key];
            }
        }
    });
})(jQuery);
},{"../templates/jquery.ui.enduranceweekplan.html":"/home/user/NetBeansProjects/EnduranceWeekPlan/public_html/templates/jquery.ui.enduranceweekplan.html"}],"/home/user/NetBeansProjects/EnduranceWeekPlan/public_html/templates/jquery.ui.enduranceweekplan.html":[function(require,module,exports){
module.exports = '<style>\n' +
    '    .jquery-ui-enduranceweekplan input{\n' +
    '        width: auto;\n' +
    '    }\n' +
    '</style>\n' +
    '<div class="jquery-ui-enduranceweekplan">\n' +
    '    <p><label>Всього часу на тиждень: <input type="number" min="0" max="100000" value="60"/></label></p>\n' +
    '    <table border="1">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th>День тижня</th>\n' +
    '                <th>Пропорційна частка тривалості навантаження (від тижня)</th>                \n' +
    '                <th>Мінімальний об’єм в цей день</th>\n' +
    '                <th>Результуюча к-сть часу</th>\n' +
    '            </tr>\n' +
    '        </thead>\n' +
    '        <tbody>\n' +
    '            <tr>\n' +
    '                <td>1</td>\n' +
    '                <td><input type="number" min="0" max="100" value="" /></td>                \n' +
    '                <td><input type="number" min="0" max="50000" value="7" /></td>\n' +
    '                <td></td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td>2</td>\n' +
    '                <td><input type="number" min="0" max="100" value="" /></td>\n' +
    '                <td><input type="number" min="0" max="50000" value="" /></td>\n' +
    '                <td></td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td>3</td>\n' +
    '                <td><input type="number" min="0" max="100" value="20" /></td>\n' +
    '                <td><input type="number" min="0" max="50000" value="7" /></td>\n' +
    '                <td></td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td>4</td>\n' +
    '                <td><input type="number" min="0" max="100" value="" /></td>\n' +
    '                <td><input type="number" min="0" max="50000" value="7" /></td>\n' +
    '                <td></td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td>5</td>\n' +
    '                <td><input type="number" min="0" max="100" value="20" /></td>\n' +
    '                <td><input type="number" min="0" max="50000" value="7" /></td>\n' +
    '                <td></td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td>6</td>\n' +
    '                <td><input type="number" min="0" max="100" value="" /></td>\n' +
    '                <td><input type="number" min="0" max="50000" value="7" /></td>\n' +
    '                <td></td>\n' +
    '            </tr>\n' +
    '            <tr>\n' +
    '                <td>7</td>\n' +
    '                <td><input type="number" min="0" max="100" value="30" /></td>\n' +
    '                <td><input type="number" min="0" max="50000" value="7" /></td>\n' +
    '                <td></td>\n' +
    '            </tr>\n' +
    '        </tbody>\n' +
    '    </table>\n' +
    '\n' +
    '</div>';
},{}]},{},["/home/user/NetBeansProjects/EnduranceWeekPlan/public_html/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWNfaHRtbC9qcy9hcHAuanMiLCJwdWJsaWNfaHRtbC90ZW1wbGF0ZXMvanF1ZXJ5LnVpLmVuZHVyYW5jZXdlZWtwbGFuLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICAkLndpZGdldChcIm5pY2Utc2l0ZS5lbmR1cmFuY2V3ZWVrcGxhblwiLCB7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgfSxcbiAgICAgICAgX2NyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9jYWxjdWxhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbihcImNoYW5nZVwiLCBcImlucHV0W3R5cGU9J251bWJlciddXCIsICQucHJveHkodGhpcy5fY2FsY3VsYXRlLCB0aGlzKSk7XG4gICAgICAgIH0sXG4gICAgICAgIF9yZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbm5lckh0bWwgPSByZXF1aXJlKFwiLi4vdGVtcGxhdGVzL2pxdWVyeS51aS5lbmR1cmFuY2V3ZWVrcGxhbi5odG1sXCIpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lmh0bWwoaW5uZXJIdG1sKTtcbiAgICAgICAgICAgIHRoaXMuJHJvd3MgPSB0aGlzLmVsZW1lbnQuZmluZChcInRhYmxlID4gdGJvZHkgPiB0clwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgX2NhbGN1bGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHN1bVBlcmNlbnQgPSAwO1xuICAgICAgICAgICAgdmFyIHJvd3MgPSBbXTtcbiAgICAgICAgICAgIHZhciByZWFsU3VtbWFyeSA9IDA7XG5cbiAgICAgICAgICAgIC8vZmV0Y2ggZGF0YSBcbiAgICAgICAgICAgIHZhciBzdW1tYXJ5ID0gTnVtYmVyKHRoaXMuZWxlbWVudC5maW5kKFwiaW5wdXRbdHlwZT0nbnVtYmVyJ11cIikuZXEoMCkudmFsKCkpIHx8IDA7XG4gICAgICAgICAgICB0aGlzLiRyb3dzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyICRyb3cgPSAkKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0ID0gTnVtYmVyKCRyb3cuY2hpbGRyZW4oXCJ0ZFwiKS5lcSgxKS5maW5kKFwiaW5wdXRbdHlwZT0nbnVtYmVyJ11cIikudmFsKCkpIHx8IDA7XG4gICAgICAgICAgICAgICAgdmFyIG1pbiA9IE51bWJlcigkcm93LmNoaWxkcmVuKFwidGRcIikuZXEoMikuZmluZChcImlucHV0W3R5cGU9J251bWJlciddXCIpLnZhbCgpKSB8fCAwO1xuICAgICAgICAgICAgICAgIHJvd3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgcGFydDogcGFydCxcbiAgICAgICAgICAgICAgICAgICAgbWluOiBtaW5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL2NhbGN1bGF0ZSBzdW1tYXJ5IHBlcmNlbnRcbiAgICAgICAgICAgICQuZWFjaChyb3dzLCBmdW5jdGlvbiAoaW5kZXgsIHJvdykge1xuICAgICAgICAgICAgICAgIHN1bVBlcmNlbnQgKz0gcm93LnBhcnQgfHwgMDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvL3NpbXBsZSBjYWxjdWxhdGlvbiBuZXZlcnRoZWxlc3Mgb2YgbWluaW11bXMgICAgICAgIFxuICAgICAgICAgICAgJC5lYWNoKHJvd3MsIGZ1bmN0aW9uIChpbmRleCwgcm93KSB7XG4gICAgICAgICAgICAgICAgcm93LnBlcmNlbnQgPSByb3cucGFydCAqIDEwMCAvIHN1bVBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgcm93LnZhbHVlID0gTWF0aC5tYXgocm93LnBlcmNlbnQgKiBzdW1tYXJ5IC8gMTAwLCByb3cubWluKTtcbiAgICAgICAgICAgICAgICByZWFsU3VtbWFyeSArPSByb3cudmFsdWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy93ZSBuZWVkIHRvIGZpeCBpZiB0aGVyZSBhcmUgbWluaW11bXNcbiAgICAgICAgICAgIGlmIChyZWFsU3VtbWFyeSA+IHN1bW1hcnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3VtU2hpZnQgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtU2hpZnRQZXJjZW50ID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWxTaGlmdCA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIG92ZXJmbG93ID0gcmVhbFN1bW1hcnkgLSBzdW1tYXJ5O1xuXG4gICAgICAgICAgICAgICAgLy9wb3NzaWJsZSBzdW1tYXJ5IGRlY3JlYXNlXG4gICAgICAgICAgICAgICAgJC5lYWNoKHJvd3MsIGZ1bmN0aW9uIChpbmRleCwgcm93KSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdy5kZWNyZWFzZSA9IHJvdy52YWx1ZSAtIHJvdy5taW47XG4gICAgICAgICAgICAgICAgICAgIHN1bVNoaWZ0ICs9IHJvdy5kZWNyZWFzZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZWFsU2hpZnQgPSBNYXRoLm1pbihzdW1TaGlmdCwgb3ZlcmZsb3cpO1xuXG4gICAgICAgICAgICAgICAgLy9ub3JtYWxpemUgc2hpZnQgcGVyY2VudHNcbiAgICAgICAgICAgICAgICAkLmVhY2gocm93cywgZnVuY3Rpb24gKGluZGV4LCByb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93LnNoaWZ0UGVyY2VudCA9IHJvdy5kZWNyZWFzZSAvIHJlYWxTaGlmdDtcbiAgICAgICAgICAgICAgICAgICAgc3VtU2hpZnRQZXJjZW50ICs9IHJvdy5zaGlmdFBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvL3NoaWZ0IHZhbHVlc1xuICAgICAgICAgICAgICAgICQuZWFjaChyb3dzLCBmdW5jdGlvbiAoaW5kZXgsIHJvdykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9ybWFsaXplZFNoaWZ0UGVyY2VudCA9IHJvdy5zaGlmdFBlcmNlbnQgLyBzdW1TaGlmdFBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHJvdy5zaGlmdCA9IG5vcm1hbGl6ZWRTaGlmdFBlcmNlbnQgKiByZWFsU2hpZnQ7XG4gICAgICAgICAgICAgICAgICAgIHJvdy52YWx1ZSA9IHJvdy52YWx1ZSAtIHJvdy5zaGlmdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9vdXRwdXRcbiAgICAgICAgICAgIHRoaXMuJHJvd3MuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHJvdyA9ICQoZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgJHJvdy5jaGlsZHJlbihcInRkXCIpLmVxKDMpLnRleHQocm93c1tpbmRleF1bJ3ZhbHVlJ10udG9GaXhlZCgxKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0T3B0aW9uOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSAnPHN0eWxlPlxcbicgK1xuICAgICcgICAgLmpxdWVyeS11aS1lbmR1cmFuY2V3ZWVrcGxhbiBpbnB1dHtcXG4nICtcbiAgICAnICAgICAgICB3aWR0aDogYXV0bztcXG4nICtcbiAgICAnICAgIH1cXG4nICtcbiAgICAnPC9zdHlsZT5cXG4nICtcbiAgICAnPGRpdiBjbGFzcz1cImpxdWVyeS11aS1lbmR1cmFuY2V3ZWVrcGxhblwiPlxcbicgK1xuICAgICcgICAgPHA+PGxhYmVsPtCS0YHRjNC+0LPQviDRh9Cw0YHRgyDQvdCwINGC0LjQttC00LXQvdGMOiA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIxMDAwMDBcIiB2YWx1ZT1cIjYwXCIvPjwvbGFiZWw+PC9wPlxcbicgK1xuICAgICcgICAgPHRhYmxlIGJvcmRlcj1cIjFcIj5cXG4nICtcbiAgICAnICAgICAgICA8dGhlYWQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDx0cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0aD7QlNC10L3RjCDRgtC40LbQvdGPPC90aD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0aD7Qn9GA0L7Qv9C+0YDRhtGW0LnQvdCwINGH0LDRgdGC0LrQsCDRgtGA0LjQstCw0LvQvtGB0YLRliDQvdCw0LLQsNC90YLQsNC20LXQvdC90Y8gKNCy0ZbQtCDRgtC40LbQvdGPKTwvdGg+ICAgICAgICAgICAgICAgIFxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRoPtCc0ZbQvdGW0LzQsNC70YzQvdC40Lkg0L7QseKAmdGU0Lwg0LIg0YbQtdC5INC00LXQvdGMPC90aD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0aD7QoNC10LfRg9C70YzRgtGD0Y7Rh9CwINC6LdGB0YLRjCDRh9Cw0YHRgzwvdGg+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDwvdHI+XFxuJyArXG4gICAgJyAgICAgICAgPC90aGVhZD5cXG4nICtcbiAgICAnICAgICAgICA8dGJvZHk+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDx0cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD4xPC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiB2YWx1ZT1cIlwiIC8+PC90ZD4gICAgICAgICAgICAgICAgXFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiNTAwMDBcIiB2YWx1ZT1cIjdcIiAvPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgPC90cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgPHRyPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjI8L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIHZhbHVlPVwiXCIgLz48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjUwMDAwXCIgdmFsdWU9XCJcIiAvPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgPC90cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgPHRyPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjM8L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIHZhbHVlPVwiMjBcIiAvPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiNTAwMDBcIiB2YWx1ZT1cIjdcIiAvPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgPC90cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgPHRyPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjQ8L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIHZhbHVlPVwiXCIgLz48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjUwMDAwXCIgdmFsdWU9XCI3XCIgLz48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDwvdHI+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDx0cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD41PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiB2YWx1ZT1cIjIwXCIgLz48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjUwMDAwXCIgdmFsdWU9XCI3XCIgLz48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDwvdHI+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDx0cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD42PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiB2YWx1ZT1cIlwiIC8+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCI1MDAwMFwiIHZhbHVlPVwiN1wiIC8+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICA8L3RyPlxcbicgK1xuICAgICcgICAgICAgICAgICA8dHI+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+NzwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiMTAwXCIgdmFsdWU9XCIzMFwiIC8+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCI1MDAwMFwiIHZhbHVlPVwiN1wiIC8+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICA8L3RyPlxcbicgK1xuICAgICcgICAgICAgIDwvdGJvZHk+XFxuJyArXG4gICAgJyAgICA8L3RhYmxlPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnPC9kaXY+JzsiXX0=
