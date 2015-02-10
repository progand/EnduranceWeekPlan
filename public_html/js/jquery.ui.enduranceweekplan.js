(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/user/NetBeansProjects/EnduranceWeekPlan/public_html/js/app.js":[function(require,module,exports){
$.widget("nice-site.enduranceweekplan", {
    options: {
    },
    _create: function () {
        this._render();
        this._calculate();
        this.element.on("change", "input[type='number']", $.proxy(this._calculate, this));
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
})
},{"../templates/jquery.ui.enduranceweekplan.html":"/home/user/NetBeansProjects/EnduranceWeekPlan/public_html/templates/jquery.ui.enduranceweekplan.html"}],"/home/user/NetBeansProjects/EnduranceWeekPlan/public_html/templates/jquery.ui.enduranceweekplan.html":[function(require,module,exports){
module.exports = '<div>\n' +
    '    <p><label>Всього часу на тиждень:</label> <input type="number" min="0" max="100000" value="60"/></p>\n' +
    '    <table border="1">\n' +
    '        <thead>\n' +
    '            <tr>\n' +
    '                <th>День тижня</th>\n' +
    '                <th>Пропорційна частка тривалості навантаження (від тижня)</th>                \n' +
    '                <th>Мінімальний об’єм</th>\n' +
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWNfaHRtbC9qcy9hcHAuanMiLCJwdWJsaWNfaHRtbC90ZW1wbGF0ZXMvanF1ZXJ5LnVpLmVuZHVyYW5jZXdlZWtwbGFuLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJC53aWRnZXQoXCJuaWNlLXNpdGUuZW5kdXJhbmNld2Vla3BsYW5cIiwge1xuICAgIG9wdGlvbnM6IHtcbiAgICB9LFxuICAgIF9jcmVhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgIHRoaXMuX2NhbGN1bGF0ZSgpO1xuICAgICAgICB0aGlzLmVsZW1lbnQub24oXCJjaGFuZ2VcIiwgXCJpbnB1dFt0eXBlPSdudW1iZXInXVwiLCAkLnByb3h5KHRoaXMuX2NhbGN1bGF0ZSwgdGhpcykpO1xuICAgIH0sXG4gICAgX3JlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW5uZXJIdG1sID0gcmVxdWlyZShcIi4uL3RlbXBsYXRlcy9qcXVlcnkudWkuZW5kdXJhbmNld2Vla3BsYW4uaHRtbFwiKTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lmh0bWwoaW5uZXJIdG1sKTtcbiAgICAgICAgdGhpcy4kcm93cyA9IHRoaXMuZWxlbWVudC5maW5kKFwidGFibGUgPiB0Ym9keSA+IHRyXCIpO1xuICAgIH0sXG4gICAgX2NhbGN1bGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc3VtUGVyY2VudCA9IDA7XG4gICAgICAgIHZhciByb3dzID0gW107XG4gICAgICAgIHZhciByZWFsU3VtbWFyeSA9IDA7XG5cbiAgICAgICAgLy9mZXRjaCBkYXRhIFxuICAgICAgICB2YXIgc3VtbWFyeSA9IE51bWJlcih0aGlzLmVsZW1lbnQuZmluZChcImlucHV0W3R5cGU9J251bWJlciddXCIpLmVxKDApLnZhbCgpKSB8fCAwO1xuICAgICAgICB0aGlzLiRyb3dzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgJHJvdyA9ICQoZWxlbWVudCk7XG4gICAgICAgICAgICB2YXIgcGFydCA9IE51bWJlcigkcm93LmNoaWxkcmVuKFwidGRcIikuZXEoMSkuZmluZChcImlucHV0W3R5cGU9J251bWJlciddXCIpLnZhbCgpKSB8fCAwO1xuICAgICAgICAgICAgdmFyIG1pbiA9IE51bWJlcigkcm93LmNoaWxkcmVuKFwidGRcIikuZXEoMikuZmluZChcImlucHV0W3R5cGU9J251bWJlciddXCIpLnZhbCgpKSB8fCAwO1xuICAgICAgICAgICAgcm93cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpZDogaW5kZXgsXG4gICAgICAgICAgICAgICAgcGFydDogcGFydCxcbiAgICAgICAgICAgICAgICBtaW46IG1pblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY2FsY3VsYXRlIHN1bW1hcnkgcGVyY2VudFxuICAgICAgICAkLmVhY2gocm93cywgZnVuY3Rpb24gKGluZGV4LCByb3cpIHtcbiAgICAgICAgICAgIHN1bVBlcmNlbnQgKz0gcm93LnBhcnQgfHwgMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9zaW1wbGUgY2FsY3VsYXRpb24gbmV2ZXJ0aGVsZXNzIG9mIG1pbmltdW1zICAgICAgICBcbiAgICAgICAgJC5lYWNoKHJvd3MsIGZ1bmN0aW9uIChpbmRleCwgcm93KSB7XG4gICAgICAgICAgICByb3cucGVyY2VudCA9IHJvdy5wYXJ0ICogMTAwIC8gc3VtUGVyY2VudDtcbiAgICAgICAgICAgIHJvdy52YWx1ZSA9IE1hdGgubWF4KHJvdy5wZXJjZW50ICogc3VtbWFyeSAvIDEwMCwgcm93Lm1pbik7XG4gICAgICAgICAgICByZWFsU3VtbWFyeSArPSByb3cudmFsdWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vd2UgbmVlZCB0byBmaXggaWYgdGhlcmUgYXJlIG1pbmltdW1zXG4gICAgICAgIGlmIChyZWFsU3VtbWFyeSA+IHN1bW1hcnkpIHtcbiAgICAgICAgICAgIHZhciBzdW1TaGlmdCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIHN1bVNoaWZ0UGVyY2VudCA9IDAsXG4gICAgICAgICAgICAgICAgICAgIHJlYWxTaGlmdCA9IDA7XG4gICAgICAgICAgICB2YXIgb3ZlcmZsb3cgPSByZWFsU3VtbWFyeSAtIHN1bW1hcnk7XG5cbiAgICAgICAgICAgIC8vcG9zc2libGUgc3VtbWFyeSBkZWNyZWFzZVxuICAgICAgICAgICAgJC5lYWNoKHJvd3MsIGZ1bmN0aW9uIChpbmRleCwgcm93KSB7XG4gICAgICAgICAgICAgICAgcm93LmRlY3JlYXNlID0gcm93LnZhbHVlIC0gcm93Lm1pbjtcbiAgICAgICAgICAgICAgICBzdW1TaGlmdCArPSByb3cuZGVjcmVhc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlYWxTaGlmdCA9IE1hdGgubWluKHN1bVNoaWZ0LCBvdmVyZmxvdyk7XG5cbiAgICAgICAgICAgIC8vbm9ybWFsaXplIHNoaWZ0IHBlcmNlbnRzXG4gICAgICAgICAgICAkLmVhY2gocm93cywgZnVuY3Rpb24gKGluZGV4LCByb3cpIHtcbiAgICAgICAgICAgICAgICByb3cuc2hpZnRQZXJjZW50ID0gcm93LmRlY3JlYXNlIC8gcmVhbFNoaWZ0O1xuICAgICAgICAgICAgICAgIHN1bVNoaWZ0UGVyY2VudCArPSByb3cuc2hpZnRQZXJjZW50O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vc2hpZnQgdmFsdWVzXG4gICAgICAgICAgICAkLmVhY2gocm93cywgZnVuY3Rpb24gKGluZGV4LCByb3cpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9ybWFsaXplZFNoaWZ0UGVyY2VudCA9IHJvdy5zaGlmdFBlcmNlbnQgLyBzdW1TaGlmdFBlcmNlbnQ7XG4gICAgICAgICAgICAgICAgcm93LnNoaWZ0ID0gbm9ybWFsaXplZFNoaWZ0UGVyY2VudCAqIHJlYWxTaGlmdDtcbiAgICAgICAgICAgICAgICByb3cudmFsdWUgPSByb3cudmFsdWUgLSByb3cuc2hpZnQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vb3V0cHV0XG4gICAgICAgIHRoaXMuJHJvd3MuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciAkcm93ID0gJChlbGVtZW50KTsgICAgICAgICAgICBcbiAgICAgICAgICAgICRyb3cuY2hpbGRyZW4oXCJ0ZFwiKS5lcSgzKS50ZXh0KHJvd3NbaW5kZXhdWyd2YWx1ZSddLnRvRml4ZWQoMSkpO1xuICAgICAgICB9KTsgICAgICAgIFxuICAgIH0sXG4gICAgc2V0T3B0aW9uOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbn0pIiwibW9kdWxlLmV4cG9ydHMgPSAnPGRpdj5cXG4nICtcbiAgICAnICAgIDxwPjxsYWJlbD7QktGB0YzQvtCz0L4g0YfQsNGB0YMg0L3QsCDRgtC40LbQtNC10L3RjDo8L2xhYmVsPiA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIxMDAwMDBcIiB2YWx1ZT1cIjYwXCIvPjwvcD5cXG4nICtcbiAgICAnICAgIDx0YWJsZSBib3JkZXI9XCIxXCI+XFxuJyArXG4gICAgJyAgICAgICAgPHRoZWFkPlxcbicgK1xuICAgICcgICAgICAgICAgICA8dHI+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGg+0JTQtdC90Ywg0YLQuNC20L3RjzwvdGg+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGg+0J/RgNC+0L/QvtGA0YbRltC50L3QsCDRh9Cw0YHRgtC60LAg0YLRgNC40LLQsNC70L7RgdGC0ZYg0L3QsNCy0LDQvdGC0LDQttC10L3QvdGPICjQstGW0LQg0YLQuNC20L3Rjyk8L3RoPiAgICAgICAgICAgICAgICBcXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0aD7QnNGW0L3RltC80LDQu9GM0L3QuNC5INC+0LHigJnRlNC8PC90aD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0aD7QoNC10LfRg9C70YzRgtGD0Y7Rh9CwINC6LdGB0YLRjCDRh9Cw0YHRgzwvdGg+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDwvdHI+XFxuJyArXG4gICAgJyAgICAgICAgPC90aGVhZD5cXG4nICtcbiAgICAnICAgICAgICA8dGJvZHk+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDx0cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD4xPC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiB2YWx1ZT1cIlwiIC8+PC90ZD4gICAgICAgICAgICAgICAgXFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiNTAwMDBcIiB2YWx1ZT1cIjdcIiAvPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgPC90cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgPHRyPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjI8L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIHZhbHVlPVwiXCIgLz48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjUwMDAwXCIgdmFsdWU9XCJcIiAvPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgPC90cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgPHRyPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjM8L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIHZhbHVlPVwiMjBcIiAvPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiNTAwMDBcIiB2YWx1ZT1cIjdcIiAvPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgPC90cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgPHRyPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjQ8L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjEwMFwiIHZhbHVlPVwiXCIgLz48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjUwMDAwXCIgdmFsdWU9XCI3XCIgLz48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDwvdHI+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDx0cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD41PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiB2YWx1ZT1cIjIwXCIgLz48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIG1heD1cIjUwMDAwXCIgdmFsdWU9XCI3XCIgLz48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICAgICAgPHRkPjwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDwvdHI+XFxuJyArXG4gICAgJyAgICAgICAgICAgIDx0cj5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD42PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCIxMDBcIiB2YWx1ZT1cIlwiIC8+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCI1MDAwMFwiIHZhbHVlPVwiN1wiIC8+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICA8L3RyPlxcbicgK1xuICAgICcgICAgICAgICAgICA8dHI+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+NzwvdGQ+XFxuJyArXG4gICAgJyAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgbWF4PVwiMTAwXCIgdmFsdWU9XCIzMFwiIC8+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjBcIiBtYXg9XCI1MDAwMFwiIHZhbHVlPVwiN1wiIC8+PC90ZD5cXG4nICtcbiAgICAnICAgICAgICAgICAgICAgIDx0ZD48L3RkPlxcbicgK1xuICAgICcgICAgICAgICAgICA8L3RyPlxcbicgK1xuICAgICcgICAgICAgIDwvdGJvZHk+XFxuJyArXG4gICAgJyAgICA8L3RhYmxlPlxcbicgK1xuICAgICdcXG4nICtcbiAgICAnPC9kaXY+JzsiXX0=
