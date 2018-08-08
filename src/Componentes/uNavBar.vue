<template>

    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="#home">Brand</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Navbar.Text>
                Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link>
            </Navbar.Text>
            <Navbar.Text pullRight>Have a great day!</Navbar.Text>
        </Navbar.Collapse>
    </Navbar>;

    
</template>

<script>
    import  imgLogo from './../assert/indra.png';

    export default {
        name: "uNavBar",
        data(){
            return{
                logo : imgLogo
            }
        }
    }
</script>

<style scoped>

</style>