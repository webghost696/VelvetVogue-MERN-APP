import requests
from bs4 import BeautifulSoup
import yt_dlp
from pydub import AudioSegment
import multiprocessing

def getSongUrl(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    li = soup.find_all('meta', attrs={'name':"music:song"})

    for i in range(3):
        songUrls.append(li[i].get('content', 'no content'))


def getTitle(url):
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    title = soup.title.text
    title = title.split('|')[0].strip()
    return title


def download_mp3(song_title, output_path):
    try:
        ydl_opts = {
            'format': 'bestaudio/best',
            'noplaylist': True,
            'default_search': 'ytsearch1',
            'quiet': True,
            'outtmpl': output_path + '/%(title)s.%(ext)s',
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',
                'preferredquality': '192',
            }],
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print(f"Downloading {song_title}")
            ydl.download([song_title])

        print(f"MP3 downloaded successfully for: {song_title}")
    
    except Exception as e:
        print(f"An error occurred: {e}")


output_path = './'

if __name__ == "__main__":
    choice = input("ENTER A CHOICE:\n1. PLAYLIST DOWNLOAD\n2. SONG DOWNLOAD\n")
    if choice == "1":
        playListUrl = input("ENTER A SPOTIFY PLAYLIST URL:\n")
        songUrls = []
        songTitle = []
        
        getSongUrl(playListUrl)
        
        for url in songUrls: 
            songTitle.append(getTitle(url))
        
        processes = []
        
        for title in songTitle:
            p = multiprocessing.Process(target=download_mp3, args=(title, output_path))
            processes.append(p)
            p.start()

        for p in processes:
            p.join()
    elif choice == "2":
        songUrl = input("ENTER THE SPOTIFY URL OF THE SONG:\n")
        Title = getTitle(songUrl)
        download_mp3(Title, output_path)
    
    else:
        print("INVALID CHOICE")
