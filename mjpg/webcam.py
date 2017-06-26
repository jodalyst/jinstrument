'''
Wrapper/example of camera class for use with webcam (on Windows 10)
'''

import numpy as np
import cv2

class Camera(object):
    def __init__(self):
        self.cap=5 #not much to do at the moment

    def start(self):
        self.cap = cv2.VideoCapture(0)

    def stop(self):
        self.cap.release()
        cv2.destroyAllWindows()

    def get_frame(self):
        ret,frame = self.cap.read()
        cv2.imwrite('tmp.jpg',frame)
        return open('tmp.jpg','rb').read()
