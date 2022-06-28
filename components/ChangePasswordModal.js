import React, {useState} from 'react';
import {Modal, FormControl, Button} from 'native-base';
import {TextInput} from 'react-native-paper';
import {axiosInstance} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePasswordModal({showModal, setShowModal}) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  async function changePassword() {
    if (
      oldPassword.length === 0 ||
      newPassword.length === 0 ||
      confirmNewPassword.length === 0
    ) {
      alert('Please fill data');
      return;
    }
    if (confirmNewPassword !== newPassword) {
      alert("Password don't match");
      return;
    }
    const token = await AsyncStorage.getItem('@token');
    axiosInstance
      .post(
        '/change-password',
        {
          new_password: newPassword,
          new_password_confirmation: confirmNewPassword,
          old_password: oldPassword,
        },
        {
          headers: {authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        if (res.status === 200) {
          setShowModal(false);
        }
      });
  }

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />

        <Modal.Header>Change password</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Old password</FormControl.Label>
            <TextInput
              label="Old password"
              mode="outlined"
              placeholder="Enter old password here"
              value={oldPassword}
              // style={styles.textInput}
              onChangeText={text => setOldPassword(text)}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>New password</FormControl.Label>
            <TextInput
              label="New password"
              mode="outlined"
              placeholder="Enter old password here"
              value={newPassword}
              // style={styles.textInput}
              onChangeText={text => setNewPassword(text)}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Confirm New password</FormControl.Label>
            <TextInput
              label="Confirm New password"
              mode="outlined"
              placeholder="Confirm New password here"
              value={confirmNewPassword}
              // style={styles.textInput}
              onChangeText={text => setConfirmNewPassword(text)}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}>
              Cancel
            </Button>
            <Button
              onPress={() => {
                changePassword();
              }}>
              Change
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
