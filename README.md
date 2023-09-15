# React + TypeScript + Vite
# ************************************************Github Project************************************************************

 I. Dark/light mode app (global variable :root)
 II. Navbar View mode (react-router): Board, Table.
 III. Clone ui/ux interface and custom.

# 1.View Board
 - Search Todo : Name , status, priority, size.(redux/toolkit)
 - Drag and drop: Todo - todo, status - status, todo-status.(@dnd-kit)
 - Todo - Description: 
              - Add, Edit - Modal Edit, Update,                            
              - Delete one, Delete many - Modal confirm.
# -Column Status: 
              - Add, Edit, Update, Delete - Modal confirm.
              - Update the length of each state.
# - Other: Menu Drop down, Modal validation (HeadlessUI)...

# 2. View Table 
      - Không Sort và không Group sẽ trở về thứ tự List Todo ban đầu.
      - Giữ trạng thái Giao diện của Sort và Group khi chuyển tab.
      - CRUD Todo và Change Options: Đồng bộ với trạng thái View Board.
      - Search Todo : Name , status, priority, size.
      - Handle scroll bars when adding more to-do.

# a, Mode table:
          - Displays a to-do list in a 4-column table.(Title-Status-In progress-Size)
          - Add to-dos to the Table.
          - Column Title:  
                     - CRUD todo.
                     - Sort ascending and descending.
                     - Stores to-do data when changing tabs.
          - Column Status, Colum In progress, Column Size:
                     - Display UI color according to each to-do.
                     - Menu Drop down: Option change Status
                     - Sort ascending - descending and Mode Group.
 # b, Mode group:
           - Group by property.
           - CRUD todo and Add todo to each group.
           - Stores to-do data when changing tabs.

# Technology is used: 
      - Vite, React, Redux/Toolkit, React-router-dom.
      - Typescript,Tailwind, Clsx, HeadlessUI, Dnd-kit.
