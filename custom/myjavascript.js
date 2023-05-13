function deleteRecord(recordId,recordName,recordLastname) {
    if (confirm('Are you sure you want to delete : ' + recordName + ' ' + recordLastname + '?')) {
        // Send an AJAX request to delete the record with the given ID
        $.ajax({
            url: '/local/practice/custom/delete.php',
            type: 'POST',
            data: {id: recordId},
            success: function(response) {
                    location.reload();
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                alert('Failed to delete record. Error - ' + errorMessage);
            }
        });
    }
}
