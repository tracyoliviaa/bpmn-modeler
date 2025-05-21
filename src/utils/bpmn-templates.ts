
export const emptyBpmnTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI" 
                  id="Definitions_1" 
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="Start">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Activity_1" name="Task">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_1" name="End">
      <bpmn:incoming>Flow_2</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Activity_1" />
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Activity_1" targetRef="EndEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="155" y="145" width="31" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1_di" bpmnElement="Activity_1">
        <dc:Bounds x="240" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1_di" bpmnElement="EndEvent_1">
        <dc:Bounds x="392" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="400" y="145" width="20" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1_di" bpmnElement="Flow_1">
        <di:waypoint x="188" y="120" />
        <di:waypoint x="240" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_2_di" bpmnElement="Flow_2">
        <di:waypoint x="340" y="120" />
        <di:waypoint x="392" y="120" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`

export const orderProcessTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                  xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI" 
                  id="Definitions_1" 
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="OrderProcess" name="Order Process" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" name="Order Received">
      <bpmn:outgoing>Flow_1</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Activity_CheckOrder" />
    <bpmn:userTask id="Activity_CheckOrder" name="Check Order">
      <bpmn:incoming>Flow_1</bpmn:incoming>
      <bpmn:outgoing>Flow_2</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="Flow_2" sourceRef="Activity_CheckOrder" targetRef="Gateway_OrderValid" />
    <bpmn:exclusiveGateway id="Gateway_OrderValid" name="Order Valid?">
      <bpmn:incoming>Flow_2</bpmn:incoming>
      <bpmn:outgoing>Flow_Valid</bpmn:outgoing>
      <bpmn:outgoing>Flow_Invalid</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_Valid" name="Yes" sourceRef="Gateway_OrderValid" targetRef="Activity_ProcessPayment" />
    <bpmn:sequenceFlow id="Flow_Invalid" name="No" sourceRef="Gateway_OrderValid" targetRef="Activity_RejectOrder" />
    <bpmn:serviceTask id="Activity_ProcessPayment" name="Process Payment">
      <bpmn:incoming>Flow_Valid</bpmn:incoming>
      <bpmn:outgoing>Flow_3</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="Flow_3" sourceRef="Activity_ProcessPayment" targetRef="Gateway_PaymentSuccessful" />
    <bpmn:exclusiveGateway id="Gateway_PaymentSuccessful" name="Payment Successful?">
      <bpmn:incoming>Flow_3</bpmn:incoming>
      <bpmn:outgoing>Flow_PaymentSuccess</bpmn:outgoing>
      <bpmn:outgoing>Flow_PaymentFailed</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_PaymentSuccess" name="Yes" sourceRef="Gateway_PaymentSuccessful" targetRef="Activity_ShipOrder" />
    <bpmn:sequenceFlow id="Flow_PaymentFailed" name="No" sourceRef="Gateway_PaymentSuccessful" targetRef="Activity_CancelOrder" />
    <bpmn:serviceTask id="Activity_ShipOrder" name="Ship Order">
      <bpmn:incoming>Flow_PaymentSuccess</bpmn:incoming>
      <bpmn:outgoing>Flow_4</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="Flow_4" sourceRef="Activity_ShipOrder" targetRef="Activity_SendConfirmation" />
    <bpmn:sendTask id="Activity_SendConfirmation" name="Send Confirmation">
      <bpmn:incoming>Flow_4</bpmn:incoming>
      <bpmn:outgoing>Flow_5</bpmn:outgoing>
    </bpmn:sendTask>
    <bpmn:sequenceFlow id="Flow_5" sourceRef="Activity_SendConfirmation" targetRef="EndEvent_OrderCompleted" />
    <bpmn:endEvent id="EndEvent_OrderCompleted" name="Order Completed">
      <bpmn:incoming>Flow_5</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:serviceTask id="Activity_RejectOrder" name="Reject Order">
      <bpmn:incoming>Flow_Invalid</bpmn:incoming>
      <bpmn:outgoing>Flow_6</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="Flow_6" sourceRef="Activity_RejectOrder" targetRef="Activity_NotifyRejection" />
    <bpmn:sendTask id="Activity_NotifyRejection" name="Notify Rejection">
      <bpmn:incoming>Flow_6</bpmn:incoming>
      <bpmn:outgoing>Flow_7</bpmn:outgoing>
    </bpmn:sendTask>
    <bpmn:sequenceFlow id="Flow_7" sourceRef="Activity_NotifyRejection" targetRef="EndEvent_OrderRejected" />
    <bpmn:endEvent id="EndEvent_OrderRejected" name="Order Rejected">
      <bpmn:incoming>Flow_7</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:serviceTask id="Activity_CancelOrder" name="Cancel Order">
      <bpmn:incoming>Flow_PaymentFailed</bpmn:incoming>
      <bpmn:outgoing>Flow_8</bpmn:outgoing>
    </bpmn:serviceTask>
    <bpmn:sequenceFlow id="Flow_8" sourceRef="Activity_CancelOrder" targetRef="Activity_NotifyCancel" />
    <bpmn:sendTask id="Activity_NotifyCancel" name="Notify Cancellation">
      <bpmn:incoming>Flow_8</bpmn:incoming>
      <bpmn:outgoing>Flow_9</bpmn:outgoing>
    </bpmn:sendTask>
    <bpmn:sequenceFlow id="Flow_9" sourceRef="Activity_NotifyCancel" targetRef="EndEvent_OrderCancelled" />
    <bpmn:endEvent id="EndEvent_OrderCancelled" name="Order Cancelled">
      <bpmn:incoming>Flow_9</bpmn:incoming>
    </bpmn:endEvent>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="OrderProcess">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="152" y="232" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="130" y="275" width="80" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ixeqzo_di" bpmnElement="Activity_CheckOrder">
        <dc:Bounds x="240" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0ygumq5_di" bpmnElement="Gateway_OrderValid" isMarkerVisible="true">
        <dc:Bounds x="395" y="225" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="388" y="195" width="64" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1qo7pym_di" bpmnElement="Activity_ProcessPayment">
        <dc:Bounds x="500" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0y9rb7i_di" bpmnElement="Gateway_PaymentSuccessful" isMarkerVisible="true">
        <dc:Bounds x="655" y="155" width="50" height="50" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="648" y="125" width="64" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0w8rhj9_di" bpmnElement="Activity_ShipOrder">
        <dc:Bounds x="760" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1n1fq3v_di" bpmnElement="Activity_SendConfirmation">
        <dc:Bounds x="920" y="80" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0jbhup8_di" bpmnElement="EndEvent_OrderCompleted">
        <dc:Bounds x="1082" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1058" y="145" width="84" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1t65hvk_di" bpmnElement="Activity_RejectOrder">
        <dc:Bounds x="500" y="300" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0rkez7f_di" bpmnElement="Activity_NotifyRejection">
        <dc:Bounds x="660" y="300" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0nzb365_di" bpmnElement="EndEvent_OrderRejected">
        <dc:Bounds x="822" y="322" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="801" y="365" width="78" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0q5d34u_di" bpmnElement="Activity_CancelOrder">
        <dc:Bounds x="760" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0bhye8l_di" bpmnElement="Activity_NotifyCancel">
        <dc:Bounds x="920" y="210" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1p1s26d_di" bpmnElement="EndEvent_OrderCancelled">
        <dc:Bounds x="1082" y="232" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1059" y="275" width="82" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0ot5p9h_di" bpmnElement="Flow_1">
        <di:waypoint x="188" y="250" />
        <di:waypoint x="240" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ue5c4h_di" bpmnElement="Flow_2">
        <di:waypoint x="340" y="250" />
        <di:waypoint x="395" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0qngvhj_di" bpmnElement="Flow_Valid">
        <di:waypoint x="420" y="225" />
        <di:waypoint x="420" y="180" />
        <di:waypoint x="500" y="180" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="426" y="200" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1yadp7s_di" bpmnElement="Flow_Invalid">
        <di:waypoint x="420" y="275" />
        <di:waypoint x="420" y="340" />
        <di:waypoint x="500" y="340" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="428" y="305" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0rnsc34_di" bpmnElement="Flow_3">
        <di:waypoint x="600" y="180" />
        <di:waypoint x="655" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ixs6f9_di" bpmnElement="Flow_PaymentSuccess">
        <di:waypoint x="680" y="155" />
        <di:waypoint x="680" y="120" />
        <di:waypoint x="760" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="686" y="135" width="18" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0aqr2ex_di" bpmnElement="Flow_PaymentFailed">
        <di:waypoint x="680" y="205" />
        <di:waypoint x="680" y="250" />
        <di:waypoint x="760" y="250" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="688" y="225" width="15" height="14" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ybhxmz_di" bpmnElement="Flow_4">
        <di:waypoint x="860" y="120" />
        <di:waypoint x="920" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1qlsxs0_di" bpmnElement="Flow_5">
        <di:waypoint x="1020" y="120" />
        <di:waypoint x="1082" y="120" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0vu8quj_di" bpmnElement="Flow_6">
        <di:waypoint x="600" y="340" />
        <di:waypoint x="660" y="340" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ixgz8k_di" bpmnElement="Flow_7">
        <di:waypoint x="760" y="340" />
        <di:waypoint x="822" y="340" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0yjpfxk_di" bpmnElement="Flow_8">
        <di:waypoint x="860" y="250" />
        <di:waypoint x="920" y="250" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ixqj9u_di" bpmnElement="Flow_9">
        <di:waypoint x="1020" y="250" />
        <di:waypoint x="1082" y="250" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`
export {}