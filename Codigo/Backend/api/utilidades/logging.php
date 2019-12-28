<?php

function meter_trace_log($log){
    $log='TRACE-'.$log.PHP_EOL;
    file_put_contents('../../log/'.date("j.n.Y").'.log', $log, FILE_APPEND);
}

function meter_debug_log($log){
    $log='DEBUG-'.$log.PHP_EOL;
    file_put_contents('../../log/'.date("j.n.Y").'.log', $log, FILE_APPEND);
    print_r(error_get_last());
}

function meter_error_log($log){
    $log='ERROR-'.$log.PHP_EOL;
    file_put_contents('../../log/'.date("j.n.Y").'.log', $log, FILE_APPEND);
}

?>