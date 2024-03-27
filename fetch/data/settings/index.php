<?php
$items = [
    "PHONE" => "8 000 000 00 00",
    "MAIL" => "Mail.info@mail.com",
    "SOCIALS" => [
        [
            "IMG" => "assets/img/icons/socials/tg.svg",
            "LINK" => "https://web.telegram.org/",
        ],
        [
            "IMG" => "assets/img/icons/socials/wa.svg",
            "LINK" => "https://web.whatsapp.com/",
        ],
    ],
    "CONTACT" => "Юридическое лицо",
    "RESPONIBLE" => "Владимир О.В.",
    "TELEGRAM" => [
        "IMG" => "assets/img/icons/socials/tg.svg",
        "LINK" => "https://web.whatsapp.com/",
        "TOPONIM" => "в Telegram",
    ],
    "WA" => [
        "IMG" => "assets/img/icons/socials/wa.svg",
        "LINK" => "https://web.whatsapp.com/",
        "TOPONIM" => "в WhatsApp"
    ],
    "REQUISITES" => [
        "ООО КАКОЕ_ТО ЮР ЛИЦО 1",
        "ИНН 0000000000000 2",
        "Свидетельство №000000000000 3",
    ],
];

echo json_encode($items);
exit;
