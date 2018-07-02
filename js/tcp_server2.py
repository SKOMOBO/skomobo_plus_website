import socket
import sys


# Wait for a connection
print ('waiting for a connection')


# Receive the data in small chunks and retransmit it
data = "0_TestDaein_2018-5-30-21-41-38_3_4_4_29.15_71.20_1677_0"
print ('received "%s"' % data)
pos1 = data.find("_")
pos2 = data.find("_",pos1+1)
host_name = (data[pos1+1:pos2])
pos1 = data.find("_",pos2+1)
data_date = (data[pos2+1:pos1])
pos2 = data.find("_",pos1+1) #pm1
pm1 = (data[pos1+1:pos2])
pos1 = data.find("_",pos2+1) #PM25
pm25 = (data[pos2+1:pos1])
pos2 = data.find("_",pos1+1) #PM10
pm10 = (data[pos1+1:pos2])
pos1 = data.find("_",pos2+1) # temperature
temperature =  (data[pos2+1:pos1])
pos2 = data.find("_",pos1+1) #humidity
humidity = (data[pos1+1:pos2])
pos1 = data.find("_",pos2+1) #CO2
co2 = (data[pos2+1:pos1])
pos2 = data.find("_",pos1+1) #PIR
pir = (data[pos1+1:pos2])

temperatureF = float(temperature)
co2N = int(co2)
humidityF = float(humidity)

#temperatureF = 21
#co2N = 500
#humidityF = 71.64

file = open("var.js","w") 
if temperatureF > 23:
	file.write("var bg_color = 'orange';\n")
	file.write("var emotion = 'hot';\n")
elif co2N > 1000:
	file.write("var bg_color = 'red';\n")
	file.write("var emotion = 'tired';\n")
elif temperatureF > 21 or co2N > 700:
	file.write("var bg_color = 'green';\n")
	file.write("var emotion = 'good';\n")
else:
	file.write("var bg_color = 'blue';\n")
	file.write("var emotion = 'happy';\n")

file.write("var state = 'face';\n")
file.write("//Set starting values\n")
file.write("var humidity = " + humidity + ";\n")
file.write("var dust = " + pm10 + ";\n")
file.write("var co2 = " + co2 + ";\n")
file.write("var temp = " + temperature + ";\n")
file.close()
