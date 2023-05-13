<?php

require_once(dirname(__FILE__) . '/../../../config.php');

$recordId = $_POST['id'];

$deleted = $DB->delete_records('local_practice', array('id' => $recordId));

if ($deleted) {
    $response = array('success' => true);
} else {
    $response = array('success' => false, 'error' => 'Failed to delete record from database.');
}

echo json_encode($response);

?>
