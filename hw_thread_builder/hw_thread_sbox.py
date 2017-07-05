
from threading import Thread, Lock



#dictionary of async objects:

'''
at beginning/creation, a dictionary (maybe) of all potential threading objects
will be created to house the thread functions, etc...

i
'''


'''
https://stackoverflow.com/questions/15729498/how-to-start-and-stop-thread
'''

bproc = {}

#will contain:
bproc['runner'] = {}
bproc['runner'] = {'trigger':{'on':'runner','off':'stopprunner'},'function':runner1,'thread'

def runner1():
    while True:
        print("hello") 

#example Flask usage:


#all hardware threading will be handled through one high-level socket router.
@app.route('/thread_command')
def index(comm_val):
    
    global threads #give access to threads dictionary
    if threads['runner1'] is None:
        threads['runner1'] = Thread(target=runner1)
        threads['runner1'].daemon = True
        threads['runner1'].start()
    return render_template('time_series_example.html')




