<?php
function getUrlContent($url){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    $data = curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ($httpcode>=200 && $httpcode<300) ? $data : false;
}
    date_default_timezone_set('EDT');
    $dom = intval(date("j"));
    $mon = intval(date("m"));
    $year_start = 1949;
    $year_end = intval(date("Y"));   

    //loop through and get all of the data 
    $y = $year_start;
    $big_data = array();
    while($y < $year_end){
        $base_url = "http://www.wunderground.com/history/airport/KIGX/". $y . "/" . $mon ."/" . $dom . "/CustomHistory.html?format=1";
        $dat = getUrlContent($base_url);
        $csv_dat = str_getcsv($dat, "\n");
        foreach($csv_dat as &$row) $row = str_getcsv($row, ";");
        #var_dump($csv_dat);
        #first row is null, next is header
        if($year_start-$y == 0){#first
            $big_data[0][]=$csv_dat[1];
        }
        foreach($csv_dat[2] as $key => $value){
            $big_data[$y-$year_start][]=$value;
        }
        $y++;
    }
    echo var_dump($big_data);
?>
