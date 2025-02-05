import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import {
  arrayOf, shape, number, string,
} from 'prop-types';
import './groupCard.scss';
import iconGrey from 'images/icon_grey-01.png';
import personAvatar from 'images/personAvatar.png';
import GroupsApi from 'apis/GroupApi';

const grApi = new GroupsApi();

const GroupCard = ({
  groupId,
  groupName,
  groupDescription,
  groupProjects,
  groupPath,
}) => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    grApi.getUsers(groupId)
      .then(setMembers)
      .catch(() => toastr.error('Error', `Group ${groupName} members coud not be fetched`));
  }, [groupId, groupName]);

  const history = useHistory();
  const goToGroupView = () => history.push(`/groups/${groupPath}`);
  return (
    <div className="card-container group-card">
      <div
        role="button"
        tabIndex="0"
        onClick={goToGroupView}
        onKeyPress={goToGroupView}
      >
        <div className="header d-flex">
          <div className="card-title">
            <p>
              {groupName}
            </p>
          </div>
        </div>
        <div className="content">
          <div style={{ height: '7rem', overflowY: 'hidden' }}>
            {groupDescription ? (
              <p className="description">
                {groupDescription}
              </p>
            ) : (
              <div className="d-flex noelement-found-div" style={{ height: 'auto', marginTop: '1rem' }}>
                <img src={iconGrey} alt="" style={{ maxHeight: '30px' }} />
                <p style={{ height: 'unset' }}>No description</p>
              </div>
            )}
          </div>
          {groupProjects.length > 0 ? (
            <div className="projects-section">
              <div className="d-flex drop-down-button">
                <p>{`${groupProjects.length} project(s)`}</p>
              </div>
            </div>
          ) : (
            <div>
              <p style={{
                backgroundColor: '#F6F6F6', color: '#B2B2B2', padding: '3px 5px 3px 5px', margin: 0,
              }}
              >
                Group has no projects
              </p>
            </div>
          )}
          <div className="members">
            <div className="members-content">
              <div className="members-content-avatars">
                {members.map((mem, index) => (
                  <div key={`ava-cont-${mem.id}`} className={`avatar-container d-flex ${index === (members.length - 1) && 'grouped'}`}>
                    <img src={mem.avatar_url} alt={mem.name} className="member-card-avatar" />
                  </div>
                ))}
              </div>
              <div className="members-number">
                <p>{members.length}</p>
                <img src={personAvatar} alt="person" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GroupCard.propTypes = {
  groupId: number.isRequired,
  groupName: string.isRequired,
  groupDescription: string.isRequired,
  groupProjects: arrayOf(
    shape({}),
  ),
  groupPath: string.isRequired,
};

GroupCard.defaultProps = {
  groupProjects: [],
};

export default GroupCard;
