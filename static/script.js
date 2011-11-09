$('.calendar').append(Calendar.generate({
    start: {
        month: 11,
        year: 2011
    },
    end: {
        month: 10,
        year: 2012
    },
    classes: 'cf',
    type: 'list',
    labels: true
}));

var O = {};

O.calendarSlider = function() {
    var cont = $('#calendar'),
        calendar = cont.find('.calendar'),
        control = cont.find('.controls'),
        slider = control.find('.slider');
        
    var c_height = calendar.height(),
        s_height = control.height(),
        q = (s_height / c_height);
        
    //console.log(s_height, c_height, (s_height / c_height));
        
    slider.draggable({
        addClasses: false,
        axis: 'y',
        containment: 'parent'
    });
};


O.calendarSlider();