
Blockly.Blocks['A1'] = {
  init: function() {
    this.jsonInit({
      "message0": 'A1 %1 %2',
      "args0": [
        {
          "type":"field_dropdown",
          "name":"CONNECT",
          "options":[["LED","LED"],["beeper","beeper"],["laser","laser"],["motor","motor"]]
        },
        {
          "type": "input_value",
          "name": "VALUE",
          

        }
      ],
      "nextStatement": "Action",
      "previousStatement":"Action",
      "colour": 160,
      "tooltip": "Returns number of letters in the provided text.",
    });
  }
};

Blockly.Blocks['A2'] = {
  init: function() {
    this.jsonInit({
      "message0": 'A2 %1 %2',
      "args0": [
        {
          "type":"field_dropdown",
          "name":"CONNECT",
          "options":[["LED","LED"],["beeper","beeper"],["laser","laser"],["motor","motor"]]
        },
        {
          "type": "input_value",
          "name": "VALUE",
          

        }
      ],
      "nextStatement": "Action",
      "previousStatement":"Action",
      "colour": 160,
      "tooltip": "Returns number of letters in the provided text.",

    });
  }
};
Blockly.Blocks['value']={
  init: function(){
    this.jsonInit(
    {
        "message0":"value %1",
        "args0":
        [
          {
            "type":"field_number",
            "name":"VAL",
            "value":100
          }
        ],
        "output":"Number",
        "colour":120

    });
  }
}

Blockly.Blocks['logic'] = {
  init: function() {
    this.jsonInit({
      "message0": 'logic %1',
      "args0": [
        {
          "type":"field_dropdown",
          "name":"VAL",
          "options":[["HIGH","HIGH"],["LOW","LOW"]]
        },
      ],
      "output":"String",
      "colour": 160
    });
  }
};

Blockly.Blocks['string_length'] = {
  init: function() {
    this.jsonInit({
      "message0": 'length of %1',
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "String"
        }
      ],
      "output": "Number",
      "colour": 160,
      "tooltip": "Returns number of letters in the provided text.",
      "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
    });
  }
};

Blockly.Blocks['wait']={
  init: function(){
    this.jsonInit(
    {
        "message0":"wait h %1 m %2 s %3",
        "args0":
        [

          {
            "type":"field_number",
            "name":"HRS",
            "value":0,
            "min":0,
            "max":24,
            "check":"Number"
          },
          {
            "type":"field_number",
            "name":"MIN",
            "value":0,
            "min":0,
            "max":60,
            "check":"Number"
          },
          {
            "type":"field_number",
            "name":"SEC",
            "value":0,
            "min":0,
            "max":60,
            "check":"Number"
          }
        ],
        "nextStatement": "Action",
        "previousStatement":"Action",
        "colour":120

    });
  }
}

Blockly.Blocks['if_do'] = {
  init: function() {
    this.jsonInit({
      "message0": 'if %1',
      "args0": [
        {
          "type":"input_value",
          "name":"CONDITION",
        },
      ],
      "message1":"do %1",
      "args1":[
      {
        "type":"input_statement",
        "name": "DO" 
      }
       
      ],
      "colour": 160
    });
  }
};

Blockly.Blocks['logic_compare'] = {
  init: function() {
    this.jsonInit({
      "message0": '%1 %2 %3 %4',
      "args0": [
        {
          "type":"field_dropdown",
          "name":"PORT",
          "options":[
            ["A1","A1"],
            ["A2","A2"],
            ["A3","A3"],
            ["A4","A4"]
          ]
        },
        {
          "type":"field_dropdown",
          "name":"DEV",
          "options":[
            ["LED","LED"],
            ["beeper","beeper"],
            ["laser","laser"],
            ["motor","motor"]
          ]
        },
        {
          "type":"field_dropdown",
          "name":"OP",
          "options":[
            ["=","="],
            [">",">"],
            ["<","<"],
            ["!=","!="]
          ]
        },
        {
          "type":"input_value",
          "name":"VAL"
        }
      ],
      "inputsInline":true,
      "output":"String",
      "colour": 160
    });
  }
};