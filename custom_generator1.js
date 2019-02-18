
function f(x)
{
	return x.charCodeAt();
}

Blockly.JavaScript['MP3']=function(block)
{
	var code='78,';
	var targetBlock=block.getInputTargetBlock('VALUE');
	if(targetBlock)
	{
		var value=targetBlock.getFieldValue('VAL');
		if(value>255)
			targetBlock.getField('VAL').setValue(255);
	 	code+="0,"+value.toString()+",";
	}
		
	mp3.innerHTML=code;
	return code;
}
function min(a,b)
{
	return a>b?b:a;
}
Blockly.JavaScript['Dot_Matrix']=function(block)
{
	var code="";
	var targetBlock=block.getInputTargetBlock('VALUE');
	if(targetBlock)
	{
		var text=targetBlock.getFieldValue('VAL');
		var textlimit='';
		for(var i=0;i<min(text.length,5);i++)
		{
			textlimit+=text[i];
		}	
		targetBlock.getField('VAL').setValue(textlimit);
		if(textlimit[0])
			code+="60,0,"+textlimit[0].charCodeAt()+",";	
		if(textlimit[1])
			code+="61,0,"+textlimit[1].charCodeAt()+",";	
		if(textlimit[2])
			code+="62,0,"+textlimit[2].charCodeAt()+",";
		if(textlimit[3])
			code+="63,0,"+textlimit[3].charCodeAt()+",";
		if(textlimit[4])
			code+="64,0,"+textlimit[4].charCodeAt()+",";					
	}	
	
	return code;
}

Blockly.JavaScript['wait']=function(block)
{
	var hrs=block.getFieldValue('HRS');
	var min=block.getFieldValue('MIN');
	var sec=block.getFieldValue('SEC');
	var milli=block.getFieldValue('MILLI');
	var hrsmili=parseInt(hrs)*60*60*1000;
	var minmili=parseInt(min)*60*1000;
	var secmili=parseInt(sec)*1000;
	var time=hrsmili+minmili+secmili+parseInt(milli);
	byte4=time & 4278190080;
	byte3=time & 16711680;
	byte2=time & 65280;
	byte1=time & 255;
	byte2>>=8;
	byte3>>=16;
	byte4>>=24;
	msg3=" }w"+(hrsmili+minmili+secmili).toString();
//	return "w,"+(hrsmili+minmili+secmili).toString();
	return "w,"+byte4.toString()+","+byte3.toString()+","+byte2.toString()+","+byte1.toString()+",";

}


function generateByteformat(value)
{
	var firstbyte="";
	var lastbyte="";
	if(value=='HIGH')
	{
		firstbyte='0',
		lastbyte='1'
	}
	else if(value=='LOW')
	{
		firstbyte='0',
		lastbyte='1'
	}
	else
	{
		first16=value & 65280;
		last16=value & 255;
		first16=first16>>8;
//			alert(typeof last16)

		firstbyte=first16.toString();
		lastbyte=last16.toString();
	}
	return firstbyte+","+lastbyte+",";
}


Blockly.JavaScript['if_do']=function(blocks)
{

	var code="";
	var conditionBlock=blocks.getInputTargetBlock('CONDITION') ;
	var child="";
	var isOutputOpen=false;
	if(conditionBlock)
	{
		var value1;
		var value2;
		var portval;
		var port=conditionBlock.getFieldValue('PORT');
		var operator=conditionBlock.getFieldValue('OP');
/*		if(port=="A1")
			portval="1,";
		else if(port=="A2")
			portval="2,";*/
//		conditionBlock.getField("VAL2").setVisible(false);
		portval=ports.indexOf(port)+1;
		
		var value1=conditionBlock.getFieldValue("VAL1");
		var value2=0;
		if(operator=="<>")
		{

			value2=conditionBlock.getFieldValue("VAL2");
			if(value2<value1)
			{
//				conditionBlock.getField("VAL2").setValue(value1);
				var temp=value2;
				var value2=value1;
				var value1=temp;
			}
			operator="?";
		}
		var value1byte=generateByteformat(value1);
		var value2byte=generateByteformat(value2);
//		alert(value2byte)
		var opascii=operator.charCodeAt().toString();
		code="d,";
		code+=value2byte+portval.toString()+","+value1byte+opascii+",";
		children=blocks.getChildren(false);
		//if(children[0])
		//	child += Blockly.JavaScript.blockToCode(children[0]);

		if(children[1])
		{

			//child += Blockly.JavaScript.blockToCode(children[1]);
			var nextBlock=children[1];
			while(nextBlock)
			{
//				console.log(nextBlock.type);
				if(!isOutputOpen && nextBlock.type.includes('A'))
				{
					child+="o,{,";
					isOutputOpen=true;
				}
				else if(!nextBlock.type.includes('A'))
				{
					child+="},";
					isOutputOpen=false;
				}
				child+=Blockly.JavaScript[nextBlock.type](nextBlock);

				nextBlock=nextBlock.getNextBlock();
			}
			if(isOutputOpen){
				isOutputOpen=false;
				child+="},";
			}
//			console.log(code+child+"0ED");
		}
//			ifucan.innerHTML = children[1].type;
//			= children[1].getNextBlock().type;
	}
	return code+child+"0,E,D,";

}
Blockly.JavaScript['value']=function(block)
{
	return "value";
}
Blockly.JavaScript['logic']=function(block)
{
	return "logic";
}
Blockly.JavaScript['logic_compare']=function(block)
{
	return "log_compare_block";
}
Blockly.JavaScript['repeat']=function(block)
{
	var code="l";
//	var countBlock=block.getInputTargetBlock('COUNT');
	var count=0; 
	count=block.getFieldValue('COUNT');
	var children=block.getChildren();
	var child="";
	var isOutputOpen = false;
	if(children[0]) {
		//child=Blockly.JavaScript.blockToCode(children[0]);
		var nextBlock = children[0];
		while(nextBlock){
			//console.log(nextBlock.type);
			if(ports.includes(nextBlock.type)/*nextBlock.type.includes('A')*/ && !isOutputOpen){
				child += "o,{,";
				isOutputOpen = true;
			}
			else if(!ports.includes(nextBlock.type)){

					isOutputOpen = false;
					child += "},";
			}

			child += Blockly.JavaScript[nextBlock.type](nextBlock);
			nextBlock = nextBlock.getNextBlock();
		}
		if(isOutputOpen) {
			child += "},";
			isOutputOpen = false;
		}

	}

//	return code+","+count.toString()+","+child;
//	repeatf.innerHTML=children[0].type;
//	console.log(code+","+count.toString()+","+child+"0ED,")
	return code+",0,0,"+count.toString()+","+child+"0,E,L,";

}

Blockly.JavaScript['start']=function(block)
{
	var code="";
	var isOutputOpen=false;
	var children=block.getChildren()
	var output=new Array();
	var index=8;
	portskey=Object.keys(ports);
	output.push(f("R"),f("T"),f("5"),1,1,f("S"),f("E"),f("T"));
	for (var i=0;i<33;i++)
	{
		output.push(f("O"));
	}
	for (var i=0;i<28;i++)
	{
		output.push(0);
	}
	
	if(children[0])
	{
		var nextBlock=children[0];
		while(nextBlock)
		{
			if( (ports.includes(nextBlock.type)|| special_accessories.includes(nextBlock.type))/*nextBlock.type.includes('A')*/ && !isOutputOpen)
			{
				code+="o,{,";
//				output.push(f('o'),f('{'));
				device=nextBlock.getFieldValue('CONNECT')

				isOutputOpen=true;
			}
			else if(!(ports.includes(nextBlock.type) || special_accessories.includes(nextBlock.type))/*!nextBlock.type.includes('A')*/ && isOutputOpen)
			{
				isOutputOpen=false;
				code+="},";
//				output.push(f('}'));
			}
			
			code+=Blockly.JavaScript[nextBlock.type](nextBlock)
			
			if(ports.includes(nextBlock.type))
			{
				var device=nextBlock.getFieldValue('CONNECT');
				var port=nextBlock.type;
				var type=portsDev[port][device];
				output[8+ports.indexOf(port)]=f(type);
			}
			else if(special_accessories.includes(nextBlock.type))
			{
				if(nextBlock.type=='MP3')
					output[30]='M'.charCodeAt();
			}
			else if(nextBlock.type=='repeat')
			{
				
				var repeatchild=nextBlock.getChildren();
				if(repeatchild[0])
				{
				
				//	alert(repeatchild[0].type);
					var nextblock=repeatchild[0];
					while(nextblock)
					{
						if(ports.includes(nextblock.type)/*nextBlock.type.includes('A')*/)
						{
							var device=nextblock.getFieldValue('CONNECT');
							var port=nextblock.type;
							var type=portsDev[port][device];
						//	alert(type);
							output[8+ports.indexOf(port)]=f(type);
						}
						else if(special_accessories.includes(nextblock.type))
						{
							if(nextblock.type=='MP3')
								output[30]='M'.charCodeAt();
							
							if(nextblock.type=='Dot_Matrix')
								output[14]='D'.charCodeAt();
								

						}

						nextblock=nextblock.getNextBlock();
					}

				}
			} 
			else if(nextBlock.type=="if_do")
			{
				var conditionblock=nextBlock.getInputTargetBlock('CONDITION') ;
				if(conditionblock)
				{
					var if_port=conditionblock.getFieldValue('PORT');
					var if_device=conditionblock.getFieldValue('DEV');
					var iftype=portsDev[if_port][if_device];
				//	alert(iftype);
					output[8+ports.indexOf(if_port)]=f(iftype);	
				}
				var ifchild=nextBlock.getChildren();
				if(ifchild[1])
				{
					var if_nextblock=ifchild[1];	
					while(if_nextblock)
					{
						if(ports.includes(if_nextblock.type))
						{
							var do_device=if_nextblock.getFieldValue('CONNECT');
							var do_port=if_nextblock.type;
							var do_type=portsDev[do_port][do_device];
						//	alert(type);
							output[8+ports.indexOf(do_port)]=f(do_type);							

						}
						else if(special_accessories.includes(if_nextblock.type))
						{
							if(if_nextblock.type=='MP3')
								output[30]='M'.charCodeAt();
							
							if(nextblock.type=='Dot_Matrix')
								output[14]='D'.charCodeAt();
							
						}
						if_nextblock=if_nextblock.getNextBlock();
					}
				}
				
				
			}
			else if(nextBlock.type=="end")
			{
			
				break;
			}

			nextBlock=nextBlock.getNextBlock();

		}
		if(isOutputOpen)
		{
			code+="},";
			isOutputOpen=false;
		}

	}
//	console.log(code)/*
	var temp=new Array();
	temp=code.split(",");
	for(var i=0;i<temp.length;i++)
	{	
		if(isNaN(temp[i]))
			output.push(f(temp[i]));
		else	
			output.push(parseInt(temp[i]));
	}
	var today=new Date();
	output[64]='t'.charCodeAt();
	output[65]=today.getHours();
	output[66]=today.getMinutes();


//	output.concat(temp);
	msg1="yy";
	console.log(output);
	out=output;
//	p1.innerHTML=JSON.stringify(output);
	text.value=JSON.stringify(output);
	return code;

}

Blockly.JavaScript['end']=function(block)
{
	var endType=block.getFieldValue('TYPE');
	var code="";
	if(endType=="REPEAT")
		code="R,S,T";
	else
		code="E,N,D";
	return code;

}

