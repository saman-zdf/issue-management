import { Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Messages from './Messages';
import issueData from './issueData';
import IssueInfo from './IssueInfo';
import PersonSelect from './PersonSelect';
import useStyles from './styles';
import { useParams } from 'react-router-dom';
import { getIssue } from '../../apiServices/IssueApi';
import IssueEditForm from './IssueEditForm';
import { useGlobalContext } from '../../contextReducer/Context';

const IssuePage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { state } = useGlobalContext();

  const [issue, setIssue] = useState([]);

  useEffect(() => {
    getIssue(id)
      .then((response) => setIssue(response))
      .catch((error) => console.log(error));
  }, [id, state.counter]);

  return (
    <>
      <Container className={classes.container}>
        <IssueEditForm issue={issue} id={id} />

        <Typography className={classes.header} variant="h4">
          Ticket
        </Typography>

        <IssueInfo issue={issue} issueData={issueData} />

        <div className={classes.mutualContainer}>
          <Typography variant="h6">{issue.title}</Typography>
          <Typography>{issue.description}</Typography>
        </div>

        <PersonSelect />

        <Messages messages={issueData.messages} />
      </Container>
    </>
  );
};

export default IssuePage;
