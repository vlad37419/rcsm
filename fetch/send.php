<?php
define('TELEGRAM_TOKEN', '6298282527:AAHoORQzO9m6nuY4DgNiinJ391qi27ccqQ8');
define('TELEGRAM_CHATID', '1376455851');

$data = json_decode(file_get_contents('php://input'), true);

$request['DATA'] = $data["DATA"];
$formName = $data["ADDITIONAL"];
$text = "Заполнена форма\n\t*" . $formName . "*";

foreach ($request["DATA"]['FIELDS'] as $res) {
    if (!empty($res["VALUE"])) {
        $text .= "\n\t\t" . $res["NAME"] . ": *" . $res["VALUE"] . "*";
    }
}

$ch = curl_init();
curl_setopt_array(
    $ch,
    array(
        CURLOPT_URL => 'https://api.telegram.org/bot' . TELEGRAM_TOKEN . '/sendMessage',
        CURLOPT_POST => TRUE,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_POSTFIELDS => array(
            'chat_id' => TELEGRAM_CHATID,
            'text' => $text,
            'parse_mode' => 'markdown'
        ),
    )
);
$res = json_decode(curl_exec($ch));
if ($res->ok) {
    $result['STATUS'] = 200;
    $result['REQUEST'] = $_REQUEST;
    if ($data['REVIEW'] == 'Y') {
        $result['RESPONSE']['TITLE'] = "Благодарим за отзыв!";
        $result['RESPONSE']['DESCR'] = "Согласно законодательству РФ, мы строго следим за содержанием отзывов на нашем сайте, поэтому он будет опубликован только после прохождения модерации.";
    } else {
        $result['RESPONSE']['TITLE'] = "Заявку получили";
        $result['RESPONSE']['DESCR'] = "Метролог свяжется с вами в ближайшее рабочее время, чтобы ответить на все вопросы";
    }
    $result['RESPONSE']['IMG'] = "assets/img/icons/send-success.svg";
} else {
    $result['STATUS'] = 203;
    $result['REQUEST'] = $_REQUEST;
    $result['RESPONSE']['TITLE'] = "Что-то пошло не так";
    $result['RESPONSE']['DESCR'] = "Отправьте заявку позже, либо свяжитесь с нами сами";
    $result['RESPONSE']['IMG'] = "assets/img/icons/send-error.svg";
}
exit(json_encode($result));
