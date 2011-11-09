Calendar = function() {
	var cal_days_labels = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
		cal_months_labels = ['Январь', 'Февраль', 'Март', 'Апрель',
		                   'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
		                   'Октябрь', 'Ноябрь', 'Декабрь'],
		now = new Date();
		
	return {
		generateTable: function(month, year, classes, labels) {
			var month = (isNaN(month) || month == null) ? now.getMonth() : month - 1;
				year  = (isNaN(year) || year == null) ? now.getFullYear() : year,
			 	first_day = new Date(year, month, 1),
				starting_day = first_day.getDay() ? (first_day.getDay() - 1) : 6, // Hacking this to make Monday the first day
				month_length = this.getDaysNum(year, month),
				month_name = cal_months_labels[month],
				now_time = now.getTime();

			var html = '<table class="calendar-table'
			    + (classes ? (' ' + classes) : '')
			    + '" cellspacing="0" cellpadding="0" data-month="'
				+ (month + 1)
				+ '" data-year="'
				+ year
				+ '">';

			if (labels) {
			    html += '<thead><tr><th colspan="4">'
			 	+ month_name + '<\/th><th class="calendar-year-label" colspan="3">' + year
				+ '<\/th><\/tr><tr>';
			
    			for(var i = 0; i <= 6; i++ ){
    				html += '<td class="calendar-day-label' + ((i > 4) ? ' calendar-weekend' : '') + '">'
    				+ cal_days_labels[i]
    				+ '<\/td>';
    			}
    			html += '<\/tr><\/thead><tbody><tr>';
			}
			else {
			    html += '<tbody><tr>';
			}

			// fill in the days
			var day = 1;
			// this loop is for is weeks (rows)
			var len = Math.ceil((month_length + starting_day) / 7);

			for (var i = 0; i < len; i++) {
				// this loop is for weekdays (cells)
				for (var j = 0; j <= 6; j++) { 
					var valid = (day <= month_length && (i > 0 || j >= starting_day)),
					    date_time = new Date(year, month, day).getTime();

					html += '<td class="calendar-day'
					+ ((now_time > date_time) ? ' past' : '') + '"'

					+ (valid ? ('data-date="'
					+ year
					+ '-'
					+ ('0' + (month + 1)).slice(-2)
					+ '-'
					+ ('0' + day).slice(-2) + '"') : '')

					+ '><span>';

					if (valid) {
						html += day;
						day++;
					}
					else {
						html += '&nbsp;';
					}
					html += '<\/span><\/td>';
				}
				// stop making rows if we've run out of days
				if (day > month_length) {
					break;
				} else {
					html += '<\/tr><tr>';
				}
			}
			html += '<\/tr><\/tbody><\/table>';

			return html;
		},
		generateList: function(month, year, inject_month) {
			var month = (isNaN(month) || month == null) ? now.getMonth() : month - 1;
				year  = (isNaN(year) || year == null) ? now.getFullYear() : year,
				month_length = this.getDaysNum(year, month),
				now_time = now.getTime();

			var html = '';

			// fill in the days
			var day = 1;

			for (; day <= month_length; day++) {
				var date_obj = new Date(year, month, day),
				    date_time = date_obj.getTime(),
				    date_day = date_obj.getDay(),
				    firstweek = (day <= 7);

				html += '<li class="calendar-day'
				+ (firstweek ? ' firstweek' : '')
				+ ((inject_month && (date_day === 0) && firstweek) ? ' monthlabel' : '')
				+ ((date_day === 1) ? ' monday' : '')
				+ ((date_day === 0 || date_day === 6) ? ' weekend' : '')
				+ ((now_time > date_time) ? ' past' : '') + '"'
				
				+ ((day === 1) ? (' data-started="'
				+ year
				+ '-'
				+ ('0' + (month + 1)).slice(-2) + '"') : '')
				
				+ ' data-date="'
				+ year
				+ '-'
				+ ('0' + (month + 1)).slice(-2)
				+ '-'
				+ ('0' + day).slice(-2) + '"'
				
				+ '><span>'
				+ day
				+ '<\/span>'
                + ((inject_month && (date_day === 0) && firstweek) ? '<strong>' + cal_months_labels[month] + '</strong>' : '')
				+ '<\/li>';
			}

			return html;
		},
		generate: function(s) {
		    var end_date,
    		    t,
    		    html ='';

            t = new Date(s.start.year, s.start.month - 1);
            end_date = new Date(s.end.year, s.end.month);
            
            if (s.type === 'list') {
                var fill_cells = t.getDay() - 1;
    		    html = '<ul class="calendar-list'
    		    + (s.classes ? (' ' + s.classes) : '')
    		    + '">';
    		    
    		    for(var i = 0; i < fill_cells; i++ ){
                    html += '<li><\/li>';
    			}
    		}

            do {
                if (s.type === 'list') {
                    html += this.generateList(t.getMonth() + 1, t.getFullYear(), s.labels);
                }
                else {
                    html += this.generateTable(t.getMonth() + 1, t.getFullYear(), s.classes, s.labels);
                }
                t = new Date(t.getFullYear(), t.getMonth() + 1);
            } while (t.getTime() != end_date.getTime())

            if (s.type === 'list') {
		        html += '<\/ul>';
    	    }
		    
            return html;
		},
		getDaysNum: function(year, month) { // nMonth is 0 thru 11
			return 32 - new Date(year, month, 32).getDate();
		}
	};
}();