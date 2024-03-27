<?php
$items = [
  [
    "NAME" => "Краснодар",
    "CODE" => "KRS",
    "CURRENT" => false,
  ],
  [
    "NAME" => "Москва",
    "CODE" => "MSC",
    "CURRENT" => true,
    "REGIONS" => [
      [
        "NAME" => "БЖД",
        "CODE" => "bjd"
      ],
      [
        "NAME" => "УФК",
        "CODE" => "ufk"
      ]
    ]
  ],
  [
    "NAME" => "Самара",
    "CODE" => "SMR",
    "CURRENT" => false,
  ],
  [
    "NAME" => "Уфа",
    "CODE" => "UFA",
    "CURRENT" => false,
  ],
  [
    "NAME" => "Омск",
    "CODE" => "OMSK",
    "CURRENT" => false,
  ],
];

echo json_encode($items);
exit;
