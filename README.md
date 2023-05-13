0) Εγκατάσταση moodle και practise plugin , έλεγχος φόρμας με δοκιμαστικά στοιχεία -> παρατήρηση σφάλματος

1) Ενεργοποίηση Site administration->Development>Debugging  για λεπτομερή έλεγχο σφαλμάτων

2) Εύρεση σφάλματος:
	Debug info: Field 'timemodified' doesn't have a default value
	INSERT INTO mdl_local_practice (firstname,lastname,email,timecreated) VALUES(?,?,?,?)
	[array (
	0 => 'te',
	1 => 'te',
	2 => '123@test.com',
	3 => 1683897746,
	)]
	Error code: dmlwriteexception 

3) Διόρθωση στο index.php τη προσθήκη default timestamp στο timemodified: $insertrecord->timemodified = time();

4) Διόρθωση του timecreated σε current timestamp -> $insertrecord->timecreated = time();

4) Παρατηρώ οτι στο index.php υπάρχει πρόβλημα στο $insertrecord->lastname=$fromform->firstname; παει το firstname και θέλει διόρθωση

5) Παρατηρώ οτι το redirection στο index.php γράφει "lndex.php" και θέλει διόρθωση ->redirect(new moodle_url('/local/practice/index.php'));

6) Update plugin στο moodle-> Παρατηρώ με insert δοκιμαστικών τιμών, αναγράφει στο lastname το firstname και δεν αναγράφει επίσης το Timecreated -> πάμε στο main.php

7) Διαγραφή $timecreated , και ενσωματωση του στο $data array, ως 'timecreated' => date('d/m/Y H:i:s', $record->timecreated)

8) Στο αρχείο main.mustache, διόρθωση του <td>{{firstname}}</td> σε <td>{{lastname}}</td>

9) Προσθήκη ελέγχου για απαγόρευση κενών entries στο practice_form.php :
public function validation($data, $files) {
        $errors = parent::validation($data, $files);

        if (empty($data['firstname']) || empty($data['lastname']) || empty($data['email'])) {
            $errors['formempty'] = get_string('formempty', 'local_practice');
        }

        return $errors;
    }

10) Προσθήκη functionality για delete ανα row, στον φάκελο custom