# doppe.js
Lightweight native javascript drag'n'drop class

## Demo

http://max201.github.io/doppe/

## Installation

Just add script on your page:

    <script type="text/javascript" src="doppe.js"></script>


## Usage

	<script type="text/javascript">
        var d = new Doppe('#draggable', '.handler');
    </script>
    <div id="draggable">
        <header class="handler">Drag</header>
        <div class="body">
            <h1>This element is draggable</h1>
        </div>
    </div>