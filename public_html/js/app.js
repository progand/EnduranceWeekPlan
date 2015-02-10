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