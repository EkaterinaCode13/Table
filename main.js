$(function () {
    var highlightedLine = '0';
    var highlightedColumn = '0';

    function log(message) {
        console.log(message);
    }

    for (var i = 1; i <= 10; i++) {
        var str = '<tr><td>Строка ' + i + '</td>';

        for (var j = 0; j < 12; j++) {
            str += '<td>1.00</td>';
        }

        str += '<td>12.00</td></tr>';

        var name = '<option value="' + i + '">' + 'Строка ' + i + '</option>';

        $('tbody').append($(str));
        $('#name').append($(name));
    }

    $('#name').change(function (event) {
        if (highlightedLine != '0') {
            var prevLine = $('tbody > tr:nth-of-type(' + highlightedLine + ')');
            prevLine.removeClass('highlighted');
        }

        if ($(this).val() != '0') {
            var line = $('tbody > tr:nth-of-type(' + $(this).val() + ')');
            line.addClass('highlighted');
        }

        highlightedLine = $(this).val();

        updateSaveButtonState();
    });

    $('#month').change(function (event) {
        if (highlightedColumn != '0') {
            var prevColumn = $(
                'tr:nth-of-type(2) > th:nth-of-type(' +
                    highlightedColumn +
                    '), td:nth-of-type(' +
                    (Number(highlightedColumn) + 1) +
                    ')'
            );
            prevColumn.removeClass('highlighted');
        }

        if ($(this).val() != '0') {
            var column = $(
                'tr:nth-of-type(2) > th:nth-of-type(' +
                    $(this).val() +
                    '), td:nth-of-type(' +
                    (Number($(this).val()) + 1) +
                    ')'
            );
            column.addClass('highlighted');
        }

        highlightedColumn = $(this).val();

        updateSaveButtonState();
    });

    $('#number').keyup(function (event) {
        updateSaveButtonState();
    });

    function updateSaveButtonState() {
        if (
            highlightedLine != '0' &&
            highlightedColumn != '0' &&
            $('#number').val() != ''
        ) {
            if ($('#save').attr('disabled')) {
                $('#save').attr('disabled', false);
            }
        } else {
            if (!$('#save').attr('disabled')) {
                $('#save').attr('disabled', true);
            }
        }
    }

    $('#save').click(function (event) {
        var cell = $(
            'tbody > tr:nth-of-type(' +
                highlightedLine +
                ') > td:nth-of-type(' +
                (Number(highlightedColumn) + 1) +
                ')'
        );

        cell.html($('#number').val());
    });

    $('#delete').click(function (event) {
        $('#name option:first').prop('selected', 'selected').change();
        $('#month option:first').prop('selected', 'selected').change();

        highlightedLine = '0';
        highlightedColumn = '0';
    });

    $('#number').inputmask('decimal');
});
