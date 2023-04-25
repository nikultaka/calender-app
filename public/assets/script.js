$(function () {


    $('#eventModal').on('hidden.bs.modal', function (e) {
        $('#dayType').val('')
        $('#staffNumber').val('')
        $('#description').val('')
        $('#calendar').fullCalendar('unselect');
    });


    $('#calendar').fullCalendar({  //initialize calender

        header: {
            left: 'prev , next  today',
            center: 'title',
            right: 'month , agendaWeek , agendaDay'
            // right: 'month,agendaWeek,timelineCustom,agendaDay,prev,today,next',
        },

        events: events,
        selectable: true,
        selectHelper: true,
        unselectAuto: true,
        editable: true,
        // fixedWeekCount: false,
        // contentHeight: 650,
        // defaultView: 'basic',
        // visibleRange: {
        //     start: moment('2023-4-22'),
        //     end: moment('2023-4-29')
        // },
        // views: {
        //     timelineCustom: {
        //         type: 'timeline',
        //         buttonText: 'Year',
        //         dateIncrement: { years: 1 },
        //         slotDuration: { months: 1 },
        //         visibleRange: function (currentDate) {
        //             return {
        //                 start: currentDate.clone().startOf('year'),
        //                 end: currentDate.clone().endOf("year")
        //             };
        //         }
        //     }
        // },


        eventRender: function eventRender(event, element, view) {
            return ['', event.staff].some(val => val.toLowerCase().trim().includes($('#search').val().toLowerCase().trim()))
        },

        select: function (start, end, allDay) {

            let startDate = moment(start).format('YYYY-MM-DD hh:mm:ss')
            let endDate = moment(start).format('YYYY-MM-DD hh:mm:ss')

            $('#startDate').val(startDate)
            $('#endDate').val(endDate)
            $('#eventModal').modal('show')

        },


        eventDrop: function (event) {
            let startDate = moment(event.start).format('YYYY-MM-DD hh:mm:ss')
            let endDate = moment(event.start).format('YYYY-MM-DD hh:mm:ss')
            var title = event.title;
            var id = event.id;

            $.ajax({
                url: BASE_URL + "/events/add",
                type: "POST",
                data: {
                    id: id,
                    dayType: title,
                    startDate: startDate,
                    endDate: endDate,
                    _token: $('meta[name="csrf-token"]').attr('content'),
                },
                success: function (response) {
                    var data = JSON.parse(response);
                    if (data.status == 1) {
                        // alert('success')

                    } else {
                        // alert('error')

                    }
                },
            });
        },


    });


    $("#save-event").on("click", function () {


        let dayType = $('#dayType').val();
        let staffNumber = $('#staffNumber').val();
        let description = $('#description').val();
        let startDate = $('#startDate').val();
        let endDate = $('#endDate').val();



        $.ajax({
            url: BASE_URL + "/events/add",
            type: "POST",
            data: {
                dayType: dayType,
                staffNumber: staffNumber,
                description: description,
                startDate: startDate,
                endDate: endDate,
                _token: $("[name='_token']").val(),
            },
            success: function (response) {
                var data = JSON.parse(response);
                if (data.status == 1) {
                    // alert('success')
                    $('#eventModal').modal('hide')
                    $('#calendar').fullCalendar('renderEvent', {
                        id: data.id,
                        title: dayType,
                        start: startDate,
                        end: endDate,
                        staff: staffNumber,

                    }, true);

                } else {
                    alert('error')

                }
            },
        });
    })


    $('#search').on('input', function (e) {
        $('#calendar').fullCalendar('rerenderEvents');
    });


    $('#start_date').on('change', function () {
        $('#calendar').fullCalendar('option', 'validRange', {
            // Don't worry if user didn't provide *any* inputs.
            start: this.value,
            end: $('#end_date').val()
        });
    });


    $('#end_date').on('change', function () {
        $('#calendar').fullCalendar('option', 'validRange', {
            // Don't worry if user didn't provide *any* inputs.
            start: $('#start_date').val(),
            end: this.value
        });
    });

    let yearArray = []
    let currentYear = new Date().getFullYear()
    let currentMonth = new Date().getMonth()

    let startYear = 1970
    while (startYear <= currentYear) {
        yearArray.push(startYear++);
    }


    let yearStr = '<select class="mt-4 select_year form-control">'
    yearArray.sort((a, b) => b - a).map((year) => {
        yearStr += `<option value="${year}">${year}</option>`
    })
    yearStr += `</select>`;


    let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthStr = '<select class="mt-4 select_month form-control"><option value=""  disabled>Select Month</option>'

    monthArray.map((month, key) => {
        monthStr += `<option value="${key + 1}" ${key == currentMonth ? 'selected' : ""}>${month}</option>`
    })
    monthStr += `</select>`;



    $(".fc-right").append(monthStr);
    $(".fc-left").append(yearStr);


    $(".select_month").on("change", function (event) {
        $('#calendar').fullCalendar('changeView', 'month', this.value);
        $('#calendar').fullCalendar('gotoDate', $(".select_year").val() + "-" + this.value + "-1");
        $('#calendar').fullCalendar('rerenderEvents');
        // $('#calendar').fullCalendar('refetchEvents');
    });


    $(".select_year").on("change", function (event) {
        $('#calendar').fullCalendar('changeView', 'month', this.value);
        $('#calendar').fullCalendar('gotoDate', this.value + "-" + $(".select_month").val() + "-1");
        $('#calendar').fullCalendar('rerenderEvents');
        // $('#calendar').fullCalendar('refetchEvents');
    });

});