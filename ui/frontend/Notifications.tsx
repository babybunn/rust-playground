import React, { useCallback } from 'react';
import { Portal } from 'react-portal';
import { useDispatch, useSelector } from 'react-redux';

import { Close } from './Icon';

import * as actions from './actions';
import * as selectors from './selectors';

import styles from './Notifications.module.css';

const MONACO_EDITOR_URL = 'https://microsoft.github.io/monaco-editor/';

const Notifications: React.SFC = () => {
  return (
    <Portal>
      <div className={styles.container}>
        <MonacoEditorAvailableNotification />
      </div>
    </Portal>
  );
};

const MonacoEditorAvailableNotification: React.SFC = () => {
  const monicoEditorAvailable = useSelector(selectors.showMonicoEditorAvailableSelector);

  const dispatch = useDispatch();
  const seenMonicoEditorAvailable = useCallback(() => dispatch(actions.seenMonicoEditorAvailable()), [dispatch]);

  return monicoEditorAvailable && (
    <Notification onClose={seenMonicoEditorAvailable}>
      The <a href={MONACO_EDITOR_URL}>Monaco Editor</a>, the code editor
      that powers VS Code, is now available in the playground. Choose
      your preferred editor from the Config menu.
    </Notification>
  );
};

interface NotificationProps {
  onClose: () => void;
}

const Notification: React.SFC<NotificationProps> = ({ onClose, children }) => (
  <div className={styles.notification}>
    <div className={styles.notificationContent}>{children}</div>
    <button className={styles.close} onClick={onClose}><Close /></button>
  </div>
);

export default Notifications;
