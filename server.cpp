#include <iostream>
#include <sstream>
#include <string>
#include <fstream>
#include <winsock2.h>
#include <ws2tcpip.h>

#pragma comment(lib, "Ws2_32.lib")

#define PORT 8080

using namespace std;

string read_file(const string& path) {
    ifstream file(path);
    if (!file.is_open()) {
        return "HTTP/1.1 404 Not Found\r\n\r\nFile Not Found";
    }
    stringstream buffer;
    buffer << file.rdbuf();
    file.close();
    return "HTTP/1.1 200 OK\r\n\r\n" + buffer.str();
}

void handle_client(SOCKET client_socket) {
    char buffer[30000] = {0};
    recv(client_socket, buffer, 30000, 0);

    string request(buffer);
    string method = request.substr(0, request.find(" "));
    string path = request.substr(request.find(" ") + 1, request.find(" HTTP/") - method.length() - 1);

    if (method == "GET") {
        string response = read_file("." + path);
        send(client_socket, response.c_str(), response.length(), 0);
    } else {
        string response = "HTTP/1.1 405 Method Not Allowed\r\n\r\n";
        send(client_socket, response.c_str(), response.length(), 0);
    }

    closesocket(client_socket);
}

int main() {
    WSADATA wsaData;
    int iResult;

    iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
    if (iResult != 0) {
        cout << "WSAStartup failed: " << iResult << endl;
        return 1;
    }

    SOCKET server_fd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (server_fd == INVALID_SOCKET) {
        cout << "Socket creation failed with error: " << WSAGetLastError() << endl;
        WSACleanup();
        return 1;
    }

    struct sockaddr_in address;
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr*)&address, sizeof(address)) == SOCKET_ERROR) {
        cout << "Bind failed with error: " << WSAGetLastError() << endl;
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    if (listen(server_fd, SOMAXCONN) == SOCKET_ERROR) {
        cout << "Listen failed with error: " << WSAGetLastError() << endl;
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    cout << "Server started on port " << PORT << endl;

    while (true) {
        SOCKET client_socket = accept(server_fd, nullptr, nullptr);
        if (client_socket == INVALID_SOCKET) {
            cout << "Accept failed with error: " << WSAGetLastError() << endl;
            closesocket(server_fd);
            WSACleanup();
            return 1;
        }

        cout << "Connection established!\n";
        handle_client(client_socket);
    }

    closesocket(server_fd);
    WSACleanup();

    return 0;
}