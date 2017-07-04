
from threading import Thread, Lock



#dictionary of async objects:

bproc = {}

#will contain:
bproc['runner'] = {}
bproc['runner'] = {'trigger':{'on':'runner','off':'stopprunner'},'function':runner1,'thread'

def runner1():
    while True:
        print("hello") 

#example Flask usage:



@app.route('/test_spot')
def index():
    global threads #give access to threads dictionary
    if threads['runner1'] is None:
        threads['runner1'] = Thread(target=runner1)
        threads['runner1'].daemon = True
        threads['runner1'].start()
    return render_template('time_series_example.html')




