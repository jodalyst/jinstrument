
'''
#Have previously done it this way and it works well

import sys

def serial_ports():
    if sys.platform.startswith('win'):
        ports = ['COM%s' % (i + 1) for i in list(range(256))]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
        # this excludes your current terminal "/dev/tty"
        ports = glob.glob('/dev/tty[A-Za-z]*')
    elif sys.platform.startswith('darwin'):
        ports = glob.glob('/dev/tty.*')
    else:
        raise EnvironmentError('Unsupported platform')
    result = []
    for port in ports:
        try:
            #print("checking port "+port)
            s = serial.Serial(port)
            #print("closing port "+port)
            s.close()
            result.append(port)
        except (OSError, serial.SerialException):
            pass
    return result
'''
#The way below is newer and I think more robust/part of the actual pyserial library:

import serial.tools.list_ports
ports = list(serial.tools.list_ports.comports())
port_dict = {i:ports[i] for i in range(len(ports))}
print("The following ports exist:")
for p in port_dict:
    print("{}:   {}".format(p,port_dict[p]))
sel_p = input("Enter the number of the port you want:  ")
try:
    sel_p = int(sel_p)
    port = port_dict[sel_p] 
except ValueError: 
    print("Please Enter a Valid Integer Corresponding to a Port!")
except KeyError:
    print("Please Enter a Valid Integer Corresponding to a Port!")

'''
#Then connect as usual!
#I have a few different serial port threading objects you can use that are pretty robust!jj
