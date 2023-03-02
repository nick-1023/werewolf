total_people = 0;

count_werewolf = 0;
count_god = 0;
count_civilian = 0;

werewolf_number = [];
god_number = [];
civilian_number = [];

last_kill_number = [];
last_antidote_number = [];
last_poison_number = [];
last_guard_number = [];
last_result = 0;
// 計算總人數
function countPeople() {
    let count_werewolf_num = 0;
    let count_god_num = 0;
    let count_civilian_num = 0;
    // 狼人數量
    $('.bad .qty').each(function () {
        count_werewolf_num += parseInt($(this).val());
    });

    // 神職數量
    $('.god .qty').each(function () {
        count_god_num += parseInt($(this).val());
    });

    // 平民數量
    $('.civilian .qty').each(function () {
        count_civilian_num += parseInt($(this).val());
    });

    count_werewolf = count_werewolf_num;
    count_god = count_god_num;
    count_civilian = count_civilian_num;
    total_people = count_werewolf_num + count_god_num + count_civilian_num;

    $('#count_werewolf').text(count_werewolf_num);
    $('#count_god').text(count_god_num);
    $('#count_civilian').text(count_civilian_num);
    $('#total_people').text(total_people);
}

// 建立號碼清單
function createChooseNumber() {
    $('.choose_number_area').each(function () {
        let id = $(this).parent().attr('id');
        let choose_number_html = "";
        let result_wolf_area = "";
        for (let i = 1; i <= total_people; i++) {
            choose_number_html += `<input type="checkbox" id="${id}-${i}" class="btn-check choose_number" name="${id}-choose_number" autocomplete="off" fieldName="${id}" value="${i}">`
            choose_number_html += `<label class="btn btn-outline-primary" for="${id}-${i}">${i} 號</label>`
        }
        $(this).html(choose_number_html);
    });

    // 狼人刀口號碼
    let kill_number_html = "";
    for (let i = 1; i <= total_people; i++) {
        kill_number_html += `<input type="checkbox" id="wolf-kill-${i}" class="btn-check wolf_kill_number" name="wolf_kill_number" autocomplete="off" fieldName="wolf-kill" value="${i}">`
        kill_number_html += `<label class="btn btn-outline-danger" for="wolf-kill-${i}">${i} 號</label>`
    }
    $('.wolf-kill-area').html(kill_number_html);

    // 女巫解藥號碼
    let antidote_number_html = "";
    for (let i = 1; i <= total_people; i++) {
        antidote_number_html += `<input type="checkbox" id="witch-antidote-${i}" class="btn-check witch_antidote_number" name="witch_antidote_number" autocomplete="off" fieldName="witch-antidote" value="${i}" disabled>`
        antidote_number_html += `<label id="witch-antidote-${i}-label" class="btn btn-outline-warning" for="witch-antidote-${i}">${i} 號</label>`
    }
    $('.witch-antidote-area').html(antidote_number_html);

    // 女巫毒藥號碼
    let poison_number_html = "";
    for (let i = 1; i <= total_people; i++) {
        poison_number_html += `<input type="checkbox" id="witch-poison-${i}" class="btn-check witch_poison_number" name="witch_poison_number" autocomplete="off" fieldName="witch-poison" value="${i}">`
        poison_number_html += `<label class="btn btn-outline-danger" for="witch-poison-${i}">${i} 號</label>`
    }
    $('.witch-poison-area').html(poison_number_html);

    // 預言家查驗號碼
    let prophet_check_number_html = "";
    for (let i = 1; i <= total_people; i++) {
        prophet_check_number_html += `<input type="checkbox" id="prophet-check-${i}" class="btn-check prophet_check_number" name="prophet_check_number" autocomplete="off" fieldName="prophet-check" value="${i}">`
        prophet_check_number_html += `<label id="prophet-check-${i}-label" class="btn btn-outline-primary" for="prophet-check-${i}">${i} 號</label>`
    }
    $('.prophet-check-area').html(prophet_check_number_html);

    // 守衛守護號碼
    let guard_guard_number_html = "";
    for (let i = 1; i <= total_people; i++) {
        guard_guard_number_html += `<input type="checkbox" id="guard-guard-${i}" class="btn-check guard_guard_number" name="guard_guard_number" autocomplete="off" fieldName="guard-guard" value="${i}">`
        guard_guard_number_html += `<label id="guard-guard-${i}-label" class="btn btn-outline-warning" for="guard-guard-${i}">${i} 號</label>`
    }
    $('.guard-guard-area').html(guard_guard_number_html);

    // 投票號碼
    let vote_number_html = "";
    for (let i = 1; i <= total_people; i++) {
        vote_number_html += `<input type="checkbox" id="vote-${i}" class="btn-check vote_number" name="vote_number" autocomplete="off" fieldName="vote" value="${i}">`
        vote_number_html += `<label id="vote-${i}-label" class="btn btn-outline-success" for="vote-${i}">${i} 號</label>`
    }
    $('.vote_number_area').html(vote_number_html);
}