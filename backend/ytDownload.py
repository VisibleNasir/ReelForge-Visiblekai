from pytubefix import YouTube
from pytubefix.cli import on_progress

url1 = "https://youtu.be/NNH-RLNyzoM?si=XWSq-57_H7WZcXQB"
url2 = "https://youtu.be/-vMgbJ6WqN4?si=queSl0Gwxyem8FkP"
url3 = "https://youtu.be/HCRuq1co99w?si=kx_FuMHGk3L3-e_H"
url4 = "https://youtu.be/uutoNHI-BD8?si=aIGqvOc2VChPz3ot"


try:
	yt = YouTube(url2, on_progress_callback=on_progress)
	print("Title:", yt.title)
	ys = yt.streams.get_highest_resolution()
	ys.download()
	print("Download completed!")
except Exception as e:
	print("Error:", e)
