import { React, useEffect, useReducer, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { userService } from '../services/user.services';
import { getUserContext } from '../context/UserContext';

function TableRows({ users }) {
    const rows = [];

    const approve = (id) => {
        userService.approve({ 'id' :id })
    }
    const remove = (id) => {
        userService.remove({ 'id' :id })
    }

    Object.entries(users).forEach(([id, user]) =>  {
        rows.push(
            <tr key={ id }>
                <td>{ id }</td>
                <td>{ user.email }</td>
                <td>{ user.first }</td>
                <td>{ user.last }</td>
                <td>{ user.ip1 }</td>
                <td>{ user.gamertag }</td>
                <td>{ user.approved.toString() }</td>
                <td>{ user.role }</td>
                <td>{ new Date(user['sign-up-date']).toDateString()}</td>
                <td>
                <Button variant="success" onClick={ () => approve(id) }  className="me-2">
                    Approve
                </Button>
                <Button variant="danger" onClick={ () => remove(id) } >
                    Delete
                </Button>
                </td>
            </tr>
        );
    });

    return rows;
}

export default function Admin() {
    const { user } = getUserContext();
    console.log(user);
    const [users, setUsers] = useState(null);

    const get = () => {
        userService.getAll(users).then(res => {
            setUsers(res);
        });
        return
    };

    return (
        <>
        {user && user.role && user.role == 'admin' ?
            <Container >
                <Row >
                    <Col lg={6} md={6} xs={12}>
                        <Container className="login-container border rounded container-sm">
                            <h1>Admin</h1>
                            <Form>
                                <Button variant="success" onClick={get} className="me-2">
                                    Get Users
                                </Button>
                            </Form>
                        </Container>
                    </Col>
                </Row>
                {
                users &&
                <Row >
                    <Col lg={12} md={12} xs={12}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>id</th>
                          <th>email</th>
                          <th>first</th>
                          <th>last</th>
                          <th>gamertag</th>
                          <th>ip1</th>
                          <th>approved</th>
                          <th>role</th>
                          <th>sign-up-date</th>
                          <th>Change Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TableRows users={ users } />
                      </tbody>
                    </Table>
                    </Col>
                </Row>
                }
            </Container> 
            : 
            <Container >
            <Row >
                <Col lg={6} md={6} xs={12}>
                    <Container className="login-container border rounded container-sm">
                        <h1>Admin</h1>
                        <p>Error: Invalid authorization</p>
                    </Container>
                </Col>
            </Row>
        </Container> 
        }
        </>
    );
}