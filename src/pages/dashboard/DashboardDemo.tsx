import React, {useState} from "react";
import {Alert, Box, Button, Card, Layout, Select, SwitchButton, TextInput,} from "../../components";
import Modal from "../../components/organisms/modal";
import {useSelector} from "react-redux";

const DashBoardPageDemo = Layout(
    () => {
        //@ts-ignore
        const {accessToken} = useSelector(state => state.auth);
        //@ts-ignore
        const {version} = useSelector(state => state.version)
        const [toggleVal, setToggleVal] = useState(false);

        const [showModal, setShowModal] = useState(false);


        return (
            <>
                <div className="p-3">
                    <div className="grid grid-flow-col grid-col-3 gap-4">
                        <Box>
                            <h3 className="mb-3">Buttons</h3>

                            <div className="flex items-center justify-between">
                                <Button color="primary" size="small">
                                    Button small
                                </Button>
                                <Button color="green">Button default</Button>
                                <Button color="red" size="large">
                                    Button large
                                </Button>
                            </div>
                        </Box>

                        <Box>
                            <h3 className="mb-3">Form control</h3>
                            <TextInput placeholder="Text input" className="w-full"/>

                            <Select
                                className="mt-3 w-full"
                                value={3}
                                data={[
                                    {value: 1, label: "option 1"},
                                    {value: 2, label: "option 2"},
                                    {value: 3, label: "option 3"},
                                    {value: 4, label: "option 4"},
                                ]}
                            />

                            <div className="mt-3 flex flex-col">
                                <SwitchButton
                                    onChange={(val) => setToggleVal(val)}
                                    value={toggleVal}
                                    label="Button small"
                                    size="small"
                                />
                                <SwitchButton
                                    className="mt-3"
                                    onChange={(val) => setToggleVal(val)}
                                    value={toggleVal}
                                    label="Button default"
                                />
                                <SwitchButton
                                    className="mt-3"
                                    onChange={(val) => setToggleVal(val)}
                                    value={toggleVal}
                                    label="Button large"
                                    size="large"
                                />
                            </div>
                        </Box>

                        <Box>
                            <h3 className="mb-3">Alert</h3>

                            <Alert color="primary" message="Simple primary alert message"/>
                            <br/>
                            <Alert color="green" message="Simple blue alert message"/>
                            <br/>
                            <Alert color="red" message="Simple red alert message"/>
                            <br/>
                            <Alert color="yellow" message="Simple yellow alert message"/>
                            <br/>
                            <Alert color="green" message="Simple green alert message"/>
                        </Box>

                        <Box>
                            <h3 className="mb-3">Modal</h3>

                            <Button
                                onClick={() => {
                                    setShowModal(!showModal);
                                }}
                            >
                                Open modal
                            </Button>

                            <Modal
                                show={showModal}
                                onChange={(showChange) => setShowModal(showChange)}
                                title="Modal title here"
                            >
                                <p>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                    Asperiores, quis tempora! Similique, explicabo quaerat maxime
                                    corrupti tenetur blanditiis voluptas molestias totam? Quaerat
                                    laboriosam suscipit repellat aliquam blanditiis eum quos
                                    nihil.
                                </p>
                            </Modal>
                        </Box>
                    </div>

                    <Box className="mt-3 bg-gray-100">
                        <h2 className="text-2xl mb-4 font-semibold leading-tight">Card</h2>

                        <div className="grid grid-flow-col gird-col-3 gap-4">
                            <Card>
                                <Card.Image
                                    src="https://images.unsplash.com/photo-1632582593957-e28f748ba619?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"/>
                                <Card.Title>Iphone 13 xách tay Singapore</Card.Title>
                                <Card.Body>
                                    Our most advanced dual‑camera system ever.A lightning-fast
                                    chip that leaves the competition behind.
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Image
                                    src="https://images.unsplash.com/photo-1632582593957-e28f748ba619?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"/>
                                <Card.Title>Iphone 13 xách tay Singapore</Card.Title>
                                <Card.Body>
                                    Our most advanced dual‑camera system ever.A lightning-fast
                                    chip that leaves the competition behind.
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Image
                                    src="https://images.unsplash.com/photo-1632582593957-e28f748ba619?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"/>
                                <Card.Title>Iphone 13 xách tay Singapore</Card.Title>
                                <Card.Body>
                                    Our most advanced dual‑camera system ever.A lightning-fast
                                    chip that leaves the competition behind.
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Image
                                    src="https://images.unsplash.com/photo-1632582593957-e28f748ba619?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"/>
                                <Card.Title>Iphone 13 xách tay Singapore</Card.Title>
                                <Card.Body>
                                    Our most advanced dual‑camera system ever.A lightning-fast
                                    chip that leaves the competition behind.
                                </Card.Body>
                            </Card>
                        </div>
                    </Box>
                </div>
            </>
        );
    })
;
export default DashBoardPageDemo;
