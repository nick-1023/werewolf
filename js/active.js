$(function () {
    // 增加按鈕
    $('.qtyplus').on('click', function (e) {
        e.preventDefault();
        fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        if (!isNaN(currentVal)) {
            if (currentVal == 1 && currentVal == $('input[name=' + fieldName + ']').attr('max')) {
                return false;
            }
            $('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            $('input[name=' + fieldName + ']').val(0);
        }
        countPeople();
    });

    // 減少按鈕
    $(".qtyminus").on('click', function (e) {
        e.preventDefault();
        fieldName = $(this).attr('field');
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        if (!isNaN(currentVal) && currentVal > 0) {
            $('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            $('input[name=' + fieldName + ']').val(0);
        }
        countPeople();
    });

    $('.modal_area').on('click', '.choose_number', function () {
        let checkedNumber = parseInt($(this).val());
        let fieldName = $(this).attr('fieldname');
        let result_number = "";
        let isWolf = false;

        // 選擇狼人身分時，預言家查驗號碼更換顏色
        switch (fieldName) {
            case 'wolf-were':
            case 'wolf-king':
            // case 'wolf-hide':
            case 'wolf-white':
            case 'wolf-queen':
            case 'wolf-ghost':
                isWolf = true;
                break;

            default:
                break;
        }

        if ($(this).prop('checked')) {
            $(`input[value="${checkedNumber}"].choose_number`).not(this).attr('disabled', true);

            // 選擇結果顯示在畫面上
            result_number += `<input type="checkbox" id="result-${fieldName}-${checkedNumber}" class="btn-check result_number" name="${fieldName}-result_number" autocomplete="off" fieldName="${fieldName}" value="${checkedNumber}" disabled>`
            result_number += `<label id="result-${fieldName}-${checkedNumber}-label" class="btn btn-outline-primary" for="result-${fieldName}-${checkedNumber}">${checkedNumber} 號</label>`
            $(`.result-${fieldName}-area .result`).append(result_number);

            // 預言家查驗號碼更換顏色
            if (isWolf) {
                $(`#prophet-check-${checkedNumber}-label`).removeClass('btn-outline-primary').addClass('btn-outline-danger');
            }
        } else {
            $(`input[value="${checkedNumber}"].choose_number`).not(this).attr('disabled', false);

            // 選擇結果移除
            $(`#result-${fieldName}-${checkedNumber}`).remove();
            $(`#result-${fieldName}-${checkedNumber}-label`).remove();

            // 預言家查驗號碼更換顏色
            if (isWolf) {
                $(`#prophet-check-${checkedNumber}-label`).removeClass('btn-outline-danger').addClass('btn-outline-primary');
            }
        }
    });

    // 狼人選擇刀口
    $('.modal_area').on('click', '.wolf_kill_number', function () {
        let checkedNumber = parseInt($(this).val());
        let fieldName = $(this).attr('fieldname');
        let kill_number = "";
        let result_text = checkedNumber + ' 號';
        if ($(this).prop('checked')) {
            $(`input[value="${checkedNumber}"].wolf_kill_number`).not(this).attr('disabled', true);

            // 選擇刀口顯示在畫面上
            kill_number += `<input type="checkbox" id="result-${fieldName}-${checkedNumber}" class="btn-check kill_number" name="${fieldName}-kill_number" autocomplete="off" fieldName="${fieldName}" value="${checkedNumber}" disabled>`
            kill_number += `<label id="result-${fieldName}-${checkedNumber}-label" class="btn btn-outline-danger" for="result-${fieldName}-${checkedNumber}">${result_text}</label>`
            $(`.result-${fieldName}-area .result`).append(kill_number);
            last_kill_number.push(checkedNumber);

            // 女巫解藥號碼變更顏色
            $(`#witch-antidote-${checkedNumber}-label`).removeClass('btn-outline-warning').addClass('btn-outline-danger');
            $(`#witch-antidote-${checkedNumber}`).attr('disabled', false);

        } else {
            $(`input[value="${checkedNumber}"].wolf_kill_number`).not(this).attr('disabled', false);

            // 選擇刀口移除
            $(`#result-${fieldName}-${checkedNumber}`).remove();
            $(`#result-${fieldName}-${checkedNumber}-label`).remove();

            if (last_kill_number.indexOf(checkedNumber) > -1) {
                last_kill_number.splice(index, 1);
            }

            // 女巫解藥號碼變更顏色
            $(`#witch-antidote-${checkedNumber}-label`).removeClass('btn-outline-danger').addClass('btn-outline-warning');
            $(`#witch-antidote-${checkedNumber}`).attr('disabled', true);
        }
    });

    // 女巫選擇解藥
    $('.modal_area').on('click', '.witch_antidote_number', function () {
        let checkedNumber = parseInt($(this).val());
        let fieldName = $(this).attr('fieldname');
        let antidote_number = "";
        let result_text = checkedNumber + ' 號';
        if ($(this).prop('checked')) {
            $(`input[value="${checkedNumber}"].witch_antidote_number`).not(this).attr('disabled', true);

            // 選擇解藥顯示在畫面上
            antidote_number += `<input type="checkbox" id="result-${fieldName}-${checkedNumber}" class="btn-check antidote_number" name="${fieldName}-antidote_number" autocomplete="off" fieldName="${fieldName}" value="${checkedNumber}" disabled>`
            antidote_number += `<label id="result-${fieldName}-${checkedNumber}-label" class="btn btn-outline-warning" for="result-${fieldName}-${checkedNumber}">${result_text}</label>`
            $(`.result-${fieldName}-area .result`).append(antidote_number);
            last_antidote_number.push(checkedNumber);
        } else {
            $(`input[value="${checkedNumber}"].witch_antidote_number`).not(this).attr('disabled', false);

            // 選擇解藥移除
            $(`#result-${fieldName}-${checkedNumber}`).remove();
            $(`#result-${fieldName}-${checkedNumber}-label`).remove();
            if (last_antidote_number.indexOf(checkedNumber) > -1) {
                last_antidote_number.splice(index, 1);
            }
        }
    });

    // 女巫選擇毒藥
    $('.modal_area').on('click', '.witch_poison_number', function () {
        let checkedNumber = parseInt($(this).val());
        let fieldName = $(this).attr('fieldname');
        let poison_number = "";
        let result_text = checkedNumber + ' 號';
        if ($(this).prop('checked')) {
            $(`input[value="${checkedNumber}"].witch_poison_number`).not(this).attr('disabled', true);

            // 選擇毒藥顯示在畫面上
            poison_number += `<input type="checkbox" id="result-${fieldName}-${checkedNumber}" class="btn-check poison_number" name="${fieldName}-poison_number" autocomplete="off" fieldName="${fieldName}" value="${checkedNumber}" disabled>`
            poison_number += `<label id="result-${fieldName}-${checkedNumber}-label" class="btn btn-outline-danger" for="result-${fieldName}-${checkedNumber}">${result_text}</label>`
            $(`.result-${fieldName}-area .result`).append(poison_number);
            last_poison_number.push(checkedNumber);
        } else {
            $(`input[value="${checkedNumber}"].witch_poison_number`).not(this).attr('disabled', false);

            // 選擇毒藥移除
            $(`#result-${fieldName}-${checkedNumber}`).remove();
            $(`#result-${fieldName}-${checkedNumber}-label`).remove();
            if (last_poison_number.indexOf(checkedNumber) > -1) {
                last_poison_number.splice(index, 1);
            }
        }
    });

    // 預言家查驗
    $('.modal_area').on('click', '.prophet_check_number', function () {
        let checkedNumber = parseInt($(this).val());
        let fieldName = $(this).attr('fieldname');
        let check_number = "";
        let result_text = checkedNumber + ' 號';
        let class_name = $(`#prophet-check-${checkedNumber}-label`).attr('class');
        if ($(this).prop('checked')) {
            $(`input[value="${checkedNumber}"].prophet_check_number`).not(this).attr('disabled', true);

            // 預言家查驗顯示在畫面上
            check_number += `<input type="checkbox" id="result-${fieldName}-${checkedNumber}" class="btn-check check_number" name="${fieldName}-check_number" autocomplete="off" fieldName="${fieldName}" value="${checkedNumber}" disabled>`
            check_number += `<label id="result-${fieldName}-${checkedNumber}-label" class="${class_name}" for="result-${fieldName}-${checkedNumber}">${result_text}</label>`
            $(`.result-${fieldName}-area .result`).append(check_number);
        } else {
            $(`input[value="${checkedNumber}"].prophet_check_number`).not(this).attr('disabled', false);

            // 預言家查驗移除
            $(`#result-${fieldName}-${checkedNumber}`).remove();
            $(`#result-${fieldName}-${checkedNumber}-label`).remove();
        }
    });

    // 守衛守護
    $('.modal_area').on('click', '.guard_guard_number', function () {
        let checkedNumber = parseInt($(this).val());
        let fieldName = $(this).attr('fieldname');
        let guard_number = "";
        let result_text = checkedNumber + ' 號';
        if ($(this).prop('checked')) {
            $(`input[value="${checkedNumber}"].guard_guard_number`).not(this).attr('disabled', true);

            // 守衛守護顯示在畫面上
            guard_number += `<input type="checkbox" id="result-${fieldName}-${checkedNumber}" class="btn-check guard_number" name="${fieldName}-guard_number" autocomplete="off" fieldName="${fieldName}" value="${checkedNumber}" disabled>`
            guard_number += `<label id="result-${fieldName}-${checkedNumber}-label" class="btn btn-outline-warning" for="result-${fieldName}-${checkedNumber}">${result_text}</label>`
            $(`.result-${fieldName}-area .result`).append(guard_number);
            last_guard_number.push(checkedNumber);
        } else {
            $(`input[value="${checkedNumber}"].guard_guard_number`).not(this).attr('disabled', false);

            // 守衛守護移除
            $(`#result-${fieldName}-${checkedNumber}`).remove();
            $(`#result-${fieldName}-${checkedNumber}-label`).remove();
            if (last_guard_number.indexOf(checkedNumber) > -1) {
                last_guard_number.splice(index, 1);
            }
        }
    });

    // 投票結果
    $('.modal_area').on('click', '.vote_number', function () {
        let checkedNumber = parseInt($(this).val());
        if ($(this).prop('checked')) {
            $(`input[value="${checkedNumber}"].wolf_kill_number`).attr('disabled', true);
            $(`input[value="${checkedNumber}"].witch_antidote_number`).attr('disabled', true);
            $(`input[value="${checkedNumber}"].witch_poison_number`).attr('disabled', true);
            $(`input[value="${checkedNumber}"].prophet_check_number`).attr('disabled', true);
            $(`input[value="${checkedNumber}"].guard_guard_number`).attr('disabled', true);

            // 更新各角色數量
            if (werewolf_number.indexOf(checkedNumber) > -1) {
                count_werewolf--;
            }

            if (god_number.indexOf(checkedNumber) > -1) {
                count_god--;
            }

            if (civilian_number.indexOf(checkedNumber) > -1) {
                count_civilian--;
            }
            total_people--;
            $('#count_werewolf').text(count_werewolf);
            $('#count_god').text(count_god);
            $('#count_civilian').text(count_civilian);
            $('#total_people').text(total_people);
        } else {
            $(`input[value="${checkedNumber}"].wolf_kill_number`).attr('disabled', false);
            $(`input[value="${checkedNumber}"].witch_antidote_number`).attr('disabled', false);
            $(`input[value="${checkedNumber}"].witch_poison_number`).attr('disabled', false);
            $(`input[value="${checkedNumber}"].prophet_check_number`).attr('disabled', false);
            $(`input[value="${checkedNumber}"].guard_guard_number`).attr('disabled', false);

            // 更新各角色數量
            if (werewolf_number.indexOf(checkedNumber) > -1) {
                count_werewolf++
            }

            if (god_number.indexOf(checkedNumber) > -1) {
                count_god++
            }

            if (civilian_number.indexOf(checkedNumber) > -1) {
                count_civilian++
            }
            total_people++
            $('#count_werewolf').text(count_werewolf);
            $('#count_god').text(count_god);
            $('#count_civilian').text(count_civilian);
            $('#total_people').text(total_people);
        }
    });

    // 開始按鈕，查詢哪些角色有人數，開啟對應的角色按鈕
    $('#start-button').on('click', function () {
        $('#start-button').hide();
        $('#role_area').hide();
        $('.qtyplus').attr('disabled', true);
        $('.qtyminus').attr('disabled', true);

        $('#wolf-button').show();
        $('.result-wolf-area').show();
        // 確認狼人角色數量
        $('.bad .qty').each(function () {
            if (parseInt($(this).val()) > 0) {
                let bad_name = $(this).attr('name');
                $('.check-' + bad_name + '-area').show();
                $('.result-' + bad_name + '-area').show();
            }
        });
        $('.result-wolf-kill-area').show();
        $('.wolf-kill-area').show();

        if (parseInt($('input[name="god-witch"]').val()) > 0) {
            $('#god-witch-button').show();
            $('.result-witch-area').show();
        }
        if (parseInt($('input[name="god-prophet"]').val()) > 0) {
            $('#god-prophet-button').show();
            $('.result-prophet-area').show();
        }
        if (parseInt($('input[name="god-guard"]').val()) > 0) {
            $('#god-guard-button').show();
            $('.result-guard-area').show();
        }
        if (parseInt($('input[name="god-eros"]').val()) > 0) {
            $('#god-eros-button').show();
            $('.result-eros-area').show();
        }
        if (parseInt($('input[name="god-magic"]').val()) > 0) {
            $('#god-magic-button').show();
            $('.result-magic-area').show();
        }
        if (parseInt($('input[name="god-hunter"]').val()) > 0) {
            $('#god-hunter-button').show();
            $('.result-hunter-area').show();
        }
        if (parseInt($('input[name="god-knight"]').val()) > 0) {
            $('#god-knight-button').show();
            $('.result-knight-area').show();
        }
        if (parseInt($('input[name="god-fool"]').val()) > 0) {
            $('#god-fool-button').show();
            $('.result-fool-area').show();
        }
        if (parseInt($('input[name="god-thief"]').val()) > 0) {
            $('#god-thief-button').show();
            $('.result-prophet-area').show();
        }

        createChooseNumber();

        $('#result-button').show();
    });

    // 昨晚結果按鈕
    $('#result-button').on('click', function () {
        var result_html = "";
        last_kill_number.forEach(function (number, index) {
            if (index == last_result) {
                let kill_number = last_kill_number[index];
                let antidote_number;
                let poison_number;
                let guard_number;
                let vote_number;

                if (!last_antidote_number[index]) {
                    last_antidote_number.push('不救');
                }
                if (!last_poison_number[index]) {
                    last_poison_number.push('不毒');
                }
                if (!last_guard_number[index]) {
                    last_guard_number.push('不守');
                }

                antidote_number = last_antidote_number[index];
                poison_number = last_poison_number[index];
                guard_number = last_guard_number[index];

                let die_number = [];
                let die_number_text = "";
                // 檢查狼刀口女巫是否有救
                if (antidote_number == '不救') {
                    // 檢查狼刀口是否有被守衛守到
                    if (guard_number == '不守') {
                        die_number.push(kill_number);
                        $(`input[value="${kill_number}"].wolf_kill_number`).attr('disabled', true);
                        $(`input[value="${kill_number}"].witch_antidote_number`).attr('disabled', true);
                        $(`input[value="${kill_number}"].witch_poison_number`).attr('disabled', true);
                        $(`input[value="${kill_number}"].prophet_check_number`).attr('disabled', true);
                        $(`input[value="${kill_number}"].guard_guard_number`).attr('disabled', true);
                        $(`input[value="${kill_number}"].vote_number`).attr('disabled', true);
                    } else if (guard_number != kill_number) {
                        die_number.push(kill_number);
                        $(`input[value="${kill_number}"].wolf_kill_number`).attr('disabled', true);
                        $(`input[value="${kill_number}"].witch_antidote_number`).attr('disabled', true);
                        $(`input[value="${kill_number}"].witch_poison_number`).attr('disabled', true);
                        $(`input[value="${kill_number}"].prophet_check_number`).attr('disabled', true);
                        $(`input[value="${kill_number}"].guard_guard_number`).attr('disabled', true);
                        $(`input[value="${kill_number}"].vote_number`).attr('disabled', true);
                    }
                } else if (antidote_number == guard_number) {
                    // 女巫救與守衛守同一個人，一樣會死
                    die_number.push(kill_number);
                    $(`input[value="${kill_number}"].wolf_kill_number`).attr('disabled', true);
                    $(`input[value="${kill_number}"].witch_antidote_number`).attr('disabled', true);
                    $(`input[value="${kill_number}"].witch_poison_number`).attr('disabled', true);
                    $(`input[value="${kill_number}"].prophet_check_number`).attr('disabled', true);
                    $(`input[value="${kill_number}"].guard_guard_number`).attr('disabled', true);
                    $(`input[value="${kill_number}"].vote_number`).attr('disabled', true);
                }

                // 女巫毒
                if (poison_number != '不毒') {
                    die_number.push(poison_number);
                    $(`input[value="${poison_number}"].wolf_kill_number`).attr('disabled', true);
                    $(`input[value="${poison_number}"].witch_antidote_number`).attr('disabled', true);
                    $(`input[value="${poison_number}"].witch_poison_number`).attr('disabled', true);
                    $(`input[value="${poison_number}"].prophet_check_number`).attr('disabled', true);
                    $(`input[value="${poison_number}"].guard_guard_number`).attr('disabled', true);
                    $(`input[value="${poison_number}"].vote_number`).attr('disabled', true);
                }

                // 將昨天投票結 disabled
                $(`.vote_number:checked`).attr('disabled', true);


                // 狼的號碼
                $(`#wolf-modal .choose_number:checked`).each(function () {
                    werewolf_number.push(parseInt($(this).val()));
                });

                // 神職的號碼
                $(`#god-modal-area .choose_number:checked`).each(function () {
                    god_number.push(parseInt($(this).val()));
                });

                // 平民的號碼
                for (let i = 1; i <= total_people; i++) {
                    if (werewolf_number.indexOf(i) < 0 && god_number.indexOf(i) < 0) {
                        civilian_number.push(i);
                    }
                }

                die_number.forEach(function (value, index) {
                    if (werewolf_number.indexOf(value) > -1) {
                        count_werewolf--;
                    }

                    if (god_number.indexOf(value) > -1) {
                        count_god--;
                    }

                    if (civilian_number.indexOf(value) > -1) {
                        count_civilian--;
                    }
                    total_people--;

                    // 昨晚結果
                    die_number_text += value + " 號";
                    if (index < die_number.length - 1) {
                        die_number_text += '、';
                    }
                });

                // 更新各角色數量
                $('#count_werewolf').text(count_werewolf);
                $('#count_god').text(count_god);
                $('#count_civilian').text(count_civilian);
                $('#total_people').text(total_people);

                result_html += '<div class="result">';
                result_html += '<h4 class="alert-heading">第 ' + (index + 1) + ' 晚結果：</h4>';
                if (die_number.length > 0) {
                    result_html += '<h5 class="alert-heading">昨晚 ' + die_number_text + ' 死了</h5>';
                } else {
                    result_html += '<h5 class="alert-heading">昨晚是平安夜</h5>';
                }
                result_html += '<p>狼人刀：' + kill_number + '</p>';
                result_html += '<p>女巫救：' + antidote_number + '</p>';
                result_html += '<p>女巫毒：' + poison_number + '</p>';
                result_html += '<p>守衛守：' + guard_number + '</p>';
                result_html += '<button type="button" id="vote-button" class="btn btn-lg btn-success" data-bs-toggle="modal" data-bs-target="#vote-modal">投票</button>'
                result_html += '</div>';

                last_result++;

                // 重新開啟狼刀口與守衛號碼
                $(`.wolf_kill_number:not(:disabled)`).prop('checked', false);
                $(`.guard_guard_number:not(:disabled)`).prop('checked', false);
            }
        });
        $('.result-area').show().prepend(result_html);
    });
});